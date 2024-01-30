fetch('https://gist.githubusercontent.com/MaxixSVK/8bf0885c605a15e941dd7c481f163602/raw/63f0b9a02e2ba9de963c9a4a5e3cf530f07ae8aa/gistfile1.txt')
.then(response => response.json())
.then(data => {
    const content = document.getElementById('content');
    data.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `<h2><span class="chevron">&#9654;</span> ${book.name ? book.name : 'No data'}</h2>
        <p>Started Reading: ${book.startedReading ? book.startedReading : 'No data'}</p>
        <p>Ended Reading: ${book.endedReading ? book.endedReading : 'No data'}</p>`;
        book.chapters.forEach(chapter => {
            const chapterDiv = document.createElement('div');
            chapterDiv.classList.add('chapter');
            chapterDiv.style.display = 'none';
            chapterDiv.innerHTML = `<h3>${chapter.name ? chapter.name : 'No data'}</h3>
            <p>Date: ${chapter.date ? chapter.date : 'No data'}</p>`;
            bookDiv.appendChild(chapterDiv);
        });
        content.appendChild(bookDiv);

        bookDiv.addEventListener('click', (event) => {
            if (event.target.classList.contains('chapter') || event.target.parentElement.classList.contains('chapter')) {
                event.stopPropagation();
                return;
            }
        
            const chapters = bookDiv.querySelectorAll('.chapter');
            const chevron = bookDiv.querySelector('.chevron');
            chapters.forEach(chapter => {
                if (chapter.style.display === 'none') {
                    chapter.style.display = 'block';
                    chevron.innerHTML = '&#9660;';
                } else {
                    chapter.style.display = 'none';
                    chevron.innerHTML = '&#9654;';
                }
            });
        });
    });
});