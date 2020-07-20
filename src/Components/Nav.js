import React from 'react'

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

export default function Nav() {
    return (
        <nav className="navbar navbar-default navbar-expand">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand white-links" href="/">SongCents</a>
                </div>
                <ul className="nav navbar-nav">
                    <li><a className="white-links" href="/ArtistList/a">A</a></li>
                    <li><a className="white-links" href="/ArtistList/b">B</a></li>
                    <li><a className="white-links" href="/ArtistList/c">C</a></li>
                    <li><a className="white-links" href="/ArtistList/d">D</a></li>
                    <li><a className="white-links" href="/ArtistList/e">E</a></li>
                    <li><a className="white-links" href="/ArtistList/f">F</a></li>
                    <li><a className="white-links" href="/ArtistList/g">G</a></li>
                    <li><a className="white-links" href="/ArtistList/h">H</a></li>
                    <li><a className="white-links" href="/ArtistList/i">I</a></li>
                    <li><a className="white-links" href="/ArtistList/j">J</a></li>
                    <li><a className="white-links" href="/ArtistList/k">K</a></li>
                    <li><a className="white-links" href="/ArtistList/l">L</a></li>
                    <li><a className="white-links" href="/ArtistList/m">M</a></li>
                    <li><a className="white-links" href="/ArtistList/n">N</a></li>
                    <li><a className="white-links" href="/ArtistList/o">O</a></li>
                    <li><a className="white-links" href="/ArtistList/p">P</a></li>
                    <li><a className="white-links" href="/ArtistList/q">Q</a></li>
                    <li><a className="white-links" href="/ArtistList/r">R</a></li>
                    <li><a className="white-links" href="/ArtistList/s">S</a></li>
                    <li><a className="white-links" href="/ArtistList/t">T</a></li>
                    <li><a className="white-links" href="/ArtistList/u">U</a></li>
                    <li><a className="white-links" href="/ArtistList/v">V</a></li>
                    <li><a className="white-links" href="/ArtistList/w">W</a></li>
                    <li><a className="white-links" href="/ArtistList/x">X</a></li>
                    <li><a className="white-links" href="/ArtistList/y">Y</a></li>
                    <li><a className="white-links" href="/ArtistList/z">Z</a></li>
                    <li><a className="white-links" href="/ArtistList/Number">#</a></li>
                    <li><a className="white-links" href="/Song/Add">+</a></li>
                </ul>
            </div>
        </nav>
    )
}
