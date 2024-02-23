function genercalendario() {
    const ano = document.getElementById('anoInput').value;
  
    if (!ano || isNaN(ano)) {
      alert('Por favor, insira um ano válido.' + ano);
      return;
    }
  
    const calendarioDiv = document.getElementById('calendario');
    calendarioDiv.innerHTML = '';
  
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
    for (let i = 0; i < meses.length; i++) {
      const nomeMes = meses[i];
      const diasNoMes = new Date(ano, i + 1, 0).getDate();
  
      const tabela = document.createElement('table');
      const linhaCabecalho = document.createElement('tr');
      const celulaCabecalho = document.createElement('th');
      celulaCabecalho.colSpan = 7;
      celulaCabecalho.textContent = nomeMes + ' ' + ano;
      linhaCabecalho.appendChild(celulaCabecalho);
      tabela.appendChild(linhaCabecalho);
  
      const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const linhaDias = document.createElement('tr');
  
      for (let j = 0; j < diasDaSemana.length; j++) {
        const celulaDia = document.createElement('td');
        celulaDia.textContent = diasDaSemana[j];
        linhaDias.appendChild(celulaDia);
      }
  
      tabela.appendChild(linhaDias);
  
      let diaAtual = 1;
      for (let j = 0; j < 6; j++) {
        const linha = document.createElement('tr');
        for (let k = 0; k < 7; k++) {
          const celula = document.createElement('td');
          if (j === 0 && k < new Date(ano, i, 1).getDay()) {
            celula.textContent = '';
          } else if (diaAtual > diasNoMes) {
            break;
          } else {
            celula.textContent = diaAtual;
            const dataAtual = new Date(ano, i, diaAtual);
            if (k === 0 || (dataAtual.getDay() === 0) || eFeriado(dataAtual)) {
              celula.style.backgroundColor = 'red';
              celula.style.color = 'white';
              celula.style.fontWeight = 'bold';
            }
            diaAtual++;
          }
          linha.appendChild(celula);
        }
        tabela.appendChild(linha);
      }
  
      calendarioDiv.appendChild(tabela);
    }
  }
  
  function eFeriado(data) {
    const feriados = [
      '01/01', // Ano Novo
      '01/05', // Dia do Trabalho
      '25/07', // Dia Estadual da Consciencia Negra
      '07/09', // Independência do Brasil
      '12/10', // Dia de Nossa Senhora Aparecida
      '15/10', // Dia da proclamação da república
      '02/11', // Finados
      '25/12',  // Natal
      calcularDomingoPascoa(dia).toString() + "/" + calcularDomingoPascoa(mes).toString()
     ] ;
  
    const dataFormatada = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;
    return feriados.includes(dataFormatada);
   
  }

  function calcularDomingoPascoa(ano) {
    // Cálculo do Ano Dourado
    let g = (ano % 19) + 1;
    
    // Cálculo da Época da Lua Cheia Pascal (Epacta)
    let siglo = Math.floor(ano / 100);
    let e = (11 * g + 20 + siglo - Math.floor(siglo / 4) - 8) % 30;
    
    // Correção para Anos Especiais
    if ((e === 25 && g > 11) || e === 24) {
        e += 1;
    }
    
    // Encontrar a Data da Lua Cheia Pascal
    let moonFullDate = 44 - e;
    if (moonFullDate < 21) {
        moonFullDate += 30;
    }
    
    // Calcular a Diferença entre a Lua Cheia Pascal e o Domingo de Páscoa
    let daysToSunday = 7 - (moonFullDate % 7);
    
    // Calcular a Data do Domingo de Páscoa
    let pascoaDate = moonFullDate + daysToSunday;
    
    // Ajustar para o mês de abril
    let mesPascoa = 3;
    if (pascoaDate > 31) {
        pascoaDate -= 31;
        mesPascoa = 4;
    }
    
    return {
        ano: ano,
        mes: mesPascoa,
        dia: pascoaDate
    };
}

/* Exemplo de uso
let ano = 2024;
let dataPascoa = calcularDomingoPascoa(ano);
console.log(`A Páscoa em ${ano} será em ${dataPascoa.dia}/${dataPascoa.mes}/${dataPascoa.ano}.`);


 // const dataFormatada = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;*/
