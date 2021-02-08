const searchSongs = async() => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    try {
    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
    }
    catch(error){
        alert("Oops!!Something went wrong");
    }
}
    const songContainer = document.getElementById("song-container");
    const displaySongs = songs =>{
        songContainer.innerHTML = null;
        const lyricsDiv = document.getElementById("song-lyrics");
        lyricsDiv.innerText = null;
        songs.forEach(song => {
            const songDiv = document.createElement("div");
            songDiv.className = "single-result row align-items-center my-3 p-3";
            songDiv.innerHTML = `
            <!-- ./ single result -->
            <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
            </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
            `
            songContainer.appendChild(songDiv);
        })
    }

const getLyrics = async(artist,title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
    const res = await fetch(url);
    const data = await res.json();
    showLyrics(data.lyrics);
    }
    catch(error){
        alert("Opps!! Something went wrong");
    }
}

const showLyrics = lyrics =>{
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
}