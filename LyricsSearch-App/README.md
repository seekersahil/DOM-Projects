# Songs Search

the original app, Lyrics Search leverages the [lyrics.ovh](https://lyricsovh.docs.apiary.io/) API.  This API was unavailable at the time of doing this project so another API was chosen.  To try and stick as closely as possible to the original project theme, [Music Brainz](https://musicbrainz.org/doc/MusicBrainz_API/Search) was chosen.  Then during the process of building the application, another API, [Cover Art Archive](https://coverartarchive.org) was included as well, to stand in for the lyrics that were rendered to the UI in the original tutorial.

## The Specifications

* Built a UI with a song search
* Fetch song/artist from Music Brainz and added to the DOM
* Added used defined URL syntax to fetch specific areas of the search array so as to create pagination in the UI.
* Provide page numbers for each set of of 10 songs found from each API fetch.
* Fetch the album art from Cover Art Archive, once the user selected the septic song that they want to see the detail on.
* Render the song detail from Music Brainz and the album art from Cover Art Archive.
* Render a default cover art image, where album art may not exist yet for the song detail selected.
* Included a text banner to indicate a condition where no album art is available.
* Used bootstrap to CDN to simplify the text banner and button styling.

Live Demo: https://dev.seekersahil.com/projects/DOM/LyricsSearch-App