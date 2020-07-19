import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import re
import json

#song class
class Song:
	title = '';
	artist = '';
	beginsWith = ''; #this field is used for searching artists
	album = '';
	lyrics = '';
	
	def __init__(self, title, artist, album, lyrics):
		self.title = title
		self.artist = artist
		self.beginsWith = artist[0].lower() if (artist[0].lower()).isalpha() else "Number"
		self.album = album
		self.lyrics = lyrics
		
	def print_song(self):
		print('Song:\t' + self.title)
		print('Artist:\t' + self.artist)
		print('Album:\t' + self.album)
		print('\n' + self.lyrics)
		
	def create_file_name(self):
		file_name = ''
		file_name += self.artist.replace(' ', '') + '-'
		file_name += self.album.replace(' ', '') + '-'
		file_name += self.title.replace(' ', '')
		file_name += '.json'
		return file_name
		
	

#remove any html tags and comments
def strip_html(str):
	str = re.sub('<.*>', '', str)
	return str

#using the link provided get the song title, artist name, album name, and lyrics of the song 
def get_song_info(link):
	page = requests.get(link)
	soup = BeautifulSoup(page.content, 'html.parser')


	#find the lyrics
	#the lyrics always start shortly after the ringtone div
	#start there and iterate over the following tags until we find the lyrics
	#the lyrics always start directly after the licensing agreement
	ringtone = soup.find(class_='ringtone')
	lyrics = ''

	for tag in ringtone.next_siblings:
		contents = str(tag)
		if '<!-- Usage of azlyrics.com content by any third-party lyrics provider is prohibited by our licensing agreement. Sorry about that. -->' in contents:
			lyrics = contents
			break

	lyrics = strip_html(str(lyrics))
	lyrics = lyrics.replace('\n', '', 2) #lyrics always have two leading \n's. Get rid of them.
	lyrics = lyrics[:-1] #remove trailing \n

	#find song title
	title = ringtone.next_sibling.next_sibling.text.split('"')[1]

	#find the artist
	artist = soup.find(class_='lyricsh')
	artist = artist.text.replace('\n', '') # remove the leading newline
	artist = artist.rsplit(' ', 1)[0] #get rid of the word 'Lyrics' at the end of the artist name

	#find the album 
	album = soup.find(class_='songinalbum_title')
	album = album.text.split('"')[1] #extract the album from the quotation marks
	album = album.replace('\n', '')


	#print stuff

	song = Song(title, artist, album, lyrics)
	return song

def export_song_json(song):
	json_string = json.dumps(song.__dict__)
	file = open('../data/' + song.create_file_name(), "w") 
	file.write(json_string)
	file.close()
	
def get_links_to_artists_pages():
	links = []
	letter = 'a'
	
	#looping 27 times A-Z + #'s
	for x in range(27):
		page = requests.get("https://www.azlyrics.com/" + (letter if x < 26 else "19") + ".html")
		soup = BeautifulSoup(page.content, 'html.parser')
		
		links.append("https://www.azlyrics.com/" + (letter if x < 26 else "19") + ".html")
		
		#increment letter
		letter = chr(ord(letter) + 1)
		
	return links
	

def main():
	#song = get_song_info('https://www.azlyrics.com/lyrics/10cc/johnnydontdoit.html')
	#export_song_json(song)
	get_links_to_artists_pages()

	
main();