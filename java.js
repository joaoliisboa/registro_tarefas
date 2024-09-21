let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
atualizarListaTarefa();
atualizarEstatisticas();

function comecarTarefa() {
    const nomeTarefa = document.getElementById('nomeTarefa').value;
    if (nomeTarefa) {
        const dataInicial = new Date();
        const tarefa = {
            nome: nomeTarefa,
            tempoInicial: dataInicial,
            tempoFinal: null,
            tempoCasto: null
        };
        tarefas.push(tarefa);
        salvarTarefas();
        atualizarListaTarefa();
        atualizarEstatisticas();
        document.getElementById('nomeTarefa').value = '';
    } else {
        alert('Por favor, insira um nome para a tarefa.');
    }
}

function terminarTarefa(index) {
    const dataFinal = new Date();
    const tarefa = tarefas[index];
    if (!tarefa.tempoFinal) {
        tarefa.tempoFinal = dataFinal;
        tarefa.tempoCasto = Math.round((dataFinal - new Date(tarefa.tempoInicial)) / 60000); // transformando para minutos
        salvarTarefas();
        atualizarListaTarefa();
        atualizarEstatisticas();
    }
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function atualizarListaTarefa() {
    const listaTarefa = document.getElementById('listaTarefa');
    listaTarefa.innerHTML = '';
    tarefas.forEach((tarefa, index) => {
        const itemLista = document.createElement('li');
        itemLista.classList.add('lista-tarefa');
        itemLista.innerHTML = `
            <span>${tarefa.nome} (Iniciada em: ${new Date(tarefa.tempoInicial).toLocaleString()})</span>
            ${tarefa.tempoFinal ? 
                `<span> - Finalizada em: ${new Date(tarefa.tempoFinal).toLocaleString()} (Tempo Gasto: ${tarefa.tempoCasto} minutos)</span>` : 
                `<button onclick="terminarTarefa(${index})">Finalizar Tarefa</button>`
            }
        `;
        listaTarefa.appendChild(itemLista);
    });
}

function atualizarEstatisticas() {
    const tarefasIniciadas = tarefas.length;
    const tarefasCompletas = tarefas.filter(tarefa => tarefa.tempoFinal).length;
    const tempoCastoTotal = tarefas.reduce((total, tarefa) => total + (tarefa.tempoCasto || 0), 0);

    document.getElementById('tarefasIniciadas').innerText = tarefasIniciadas;
    document.getElementById('tarefasCompletas').innerText = tarefasCompletas;
    document.getElementById('tempoCastoTotal').innerText = tempoCastoTotal;
}