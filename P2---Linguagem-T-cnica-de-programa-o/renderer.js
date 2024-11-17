async function buscarLivros() {
  const query = document.getElementById('query').value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.items) {
      const resultados = data.items.map(item => {
        const info = item.volumeInfo;
        return `
          <div class="livro">
            <h3>${info.title}</h3>
            <p><strong>Autor(es):</strong> ${info.authors ? info.authors.join(', ') : 'Desconhecido'}</p>
            <p><strong>Descrição:</strong> ${info.description ? info.description.substring(0, 150) + '...' : 'Não disponível'}</p>
            <img src="${info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=Sem+Capa'}" alt="Capa de ${info.title}">
          </div>
        `;
      }).join('');

      document.getElementById('resultado').innerHTML = resultados;
    } else {
      document.getElementById('resultado').innerHTML = '<p>Nenhum livro encontrado.</p>';
    }
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    document.getElementById('resultado').innerHTML = '<p>Erro ao buscar livros.</p>';
  }
}
