require 'nokogiri'
require 'httparty'
require 'ostruct'
require 'pry'
require 'json'
require 'uri'

SEARCH_SITES = [
  {
    url: 'http://en.wikipedia.org/wiki/%s',
    container: '.infobox.vcard img[alt*=crest]',
    normalize_query: ->(q) { q.gsub(' ', '_') }
  }
].freeze

STORAGE_DIR = File.join(File.dirname(__FILE__), '../public/assets/logos/teams').freeze

def fix_url(url)
  uri = URI(URI.escape(url))
  if uri.scheme == nil
    return "http:#{uri.to_s}"
  end
  return uri.to_s
end

def download(url, options = {})
  url = fix_url(url)
  response = HTTParty.get(url, options)
  return response.body if response.success?
  nil
end

def save_image_from_url(url, &block)
  blob = download(url)
  basename = if block_given?
    yield
  else
    File.basename(url)
  end

  File.open("#{STORAGE_DIR}/#{basename}", "wb") do |f|
    f.write(blob)
  end
end

def run(query)
  SEARCH_SITES.each do |site|
    resolve_url = sprintf(site[:url], site[:normalize_query].call(query))
    html = download(resolve_url)
    page = Nokogiri::HTML(html)
    image_element = page.css(site[:container]).first
    next unless image_element

    save_image_from_url(image_element['src'])
  end
end

API_KEY = 'super_secret'.freeze
API_URL = 'http://football.io/v1'.freeze

(1..300).each do |id|
  url = "#{API_URL}/teams/#{id}"
  json_string = download(url, headers: { 'X-Auth-Token' => API_KEY })
  team = JSON(json_string)
  team_name = team['name']

  if team['crestUrl'] != nil
    save_image_from_url(team['crestUrl'])
  else
    puts "#{id} Processing team: #{team_name}"
    run(team_name)
  end
end
