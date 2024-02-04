// Fetch all the data from the API and display it on the page
fetch('https://api.npoint.io/ed7902bd1810c6dc7014')
    .then(response => response.json())
    .then(urls => {
        Promise.all(urls.map(url =>
            fetch(url).then(response => response.json())
        ))
            .then(dataArrays => {
                // Flatten dataArrays
                const flattenedData = [].concat(...dataArrays);
                flattenedData.forEach((data) => {
                    // Get the content div
                    const content = document.getElementById('content');

                    // Create a new div for the series
                    const seriesDiv = document.createElement('div');
                    seriesDiv.classList.add('series');

                    // Create a new div for the series name and image
                    const seriesInfoDiv = document.createElement('div');
                    seriesInfoDiv.classList.add('series-info');

                    // Add the series name to the series info div
                    const seriesName = document.createElement('h1');
                    seriesName.innerHTML = `<span class="chevron">&#9654;</span> ${data.seriesName}`;
                    seriesName.classList.add('series-name');
                    seriesInfoDiv.appendChild(seriesName);

                    // Add the series image to the series info div
                    const seriesImage = document.createElement('img');
                    seriesImage.src = data.img;
                    seriesImage.alt = data.seriesName;
                    seriesImage.classList.add('series-image');
                    seriesInfoDiv.appendChild(seriesImage);

                    // Add the series info div to the series div
                    seriesDiv.appendChild(seriesInfoDiv);

                    // Add the books to the series div
                    data.books.forEach(book => {
                        const bookDiv = document.createElement('div');
                        bookDiv.classList.add('book');
                        bookDiv.style.display = 'none';
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
                        seriesDiv.appendChild(bookDiv);
                        // Add the book div to the series div
                        bookDiv.addEventListener('click', (event) => {
                            if (event.target.classList.contains('chapter') || event.target.parentElement.classList.contains('chapter')) {
                                event.stopPropagation();
                                return;
                            }
                            // Toggle the display of the chapters
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

                    // Add the series div to the content div
                    content.appendChild(seriesDiv);

                    seriesInfoDiv.addEventListener('click', () => {
                        const books = seriesDiv.querySelectorAll('.book');
                        books.forEach(book => {
                            if (book.style.display === 'none') {
                                book.style.display = 'block';
                                seriesInfoDiv.querySelector('.chevron').innerHTML = '&#9660;';
                            } else {
                                book.style.display = 'none';
                                seriesInfoDiv.querySelector('.chevron').innerHTML = '&#9654;';
                            }
                        });
                    });

                    // Hide the loading text
                    document.getElementById('loadingText').style.display = 'none';
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });