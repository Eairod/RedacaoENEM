let redacoes = [];

// Carregar o JSON local
fetch('redacoes_enem.json')
    .then(response => response.json())
    .then(data => {
        redacoes = data;
    })
    .catch(error => {
        console.error("Erro ao carregar o arquivo JSON:", error);
        alert("Não foi possível carregar as redações.");
    });

document.getElementById('gerar').addEventListener('click', () => {
    const comp = document.getElementById('competencia').value;
    let filtradas;

    if (comp === 'misto') {
        filtradas = redacoes.filter(r => r.categoria.toLowerCase().includes('misto'));
    } else if (comp === 'all') {
        alert("Selecione uma competência.");
        return;
    } else {
        filtradas = redacoes.filter(r => Number(r.competencia) === Number(comp) && !r.categoria.toLowerCase().includes('misto'));
    }

    if (filtradas.length === 0) {
        alert("Nenhuma redação encontrada para essa seleção.");
        return;
    }

    const escolhida = filtradas[Math.floor(Math.random() * filtradas.length)];
    document.getElementById('texto-defeituoso').innerText = escolhida.texto_defeituoso;
    document.getElementById('texto-corrigido').innerText = escolhida.texto_corrigido;

    document.getElementById('redacao-section').style.display = 'block';
    document.getElementById('texto-corrigido').style.display = 'none';
});

document.getElementById('mostrar-correta').addEventListener('click', () => {
    document.getElementById('texto-corrigido').style.display = 'block';
});
