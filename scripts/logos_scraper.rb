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
    normalize_query: ->(q) { q.to_s.gsub(' ', '_') }
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
  puts "[WARN] HTTP 404 fetching #{url}" if response.code == 404
  response.body
rescue URI::InvalidURIError
  puts "[ERROR] URL could not be fixed"
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

def valid_json?(string)
  return false if string.nil?
  return true if ['{', '['].include?(string[0])
end

API_KEY = 'super_secret'.freeze
API_URL = 'http://api.football-data.org/v1'.freeze

(1..600).to_a.reverse.each do |id|
  url = "#{API_URL}/teams/#{id}"
  json_string = download(url, headers: { 'X-Auth-Token' => API_KEY })

  next unless valid_json?(json_string)

  team = JSON(json_string)
  team_name = team['name']
  puts "#{id} Processing team: #{team_name}"
  crest_url = team['crestUrl']
  if  crest_url != nil
    save_image_from_url(crest_url) { "#{id}#{File.extname(crest_url)}" }
  else
    puts "    Scraping logo"
    run(team_name)
  end
end
