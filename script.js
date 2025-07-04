let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];
let editandoIndex = null;

const form = document.getElementById("form-lancamento");
const tabela = document.getElementById("tabela-lancamentos");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const lancamento = {
    vencimento: document.getElementById("vencimento").value,
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(document.getElementById("valor").value),
    tipo: document.getElementById("tipo").value,
    nome: document.getElementById("nome").value,
    situacao: document.getElementById("situacao").value,
  };

  if (editandoIndex !== null) {
    lancamentos[editandoIndex] = lancamento;
    editandoIndex = null;
  } else {
    lancamentos.push(lancamento);
  }

  salvar();
  form.reset();
});

function salvar() {
  localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
  carregarTabela();
}

function carregarTabela() {
  tabela.innerHTML = "";
  lancamentos.forEach((l, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${l.vencimento}</td>
      <td>${l.descricao}</td>
      <td>R$ ${l.valor.toFixed(2)}</td>
      <td>${l.tipo}</td>
      <td>${l.nome}</td>
      <td>${l.situacao}</td>
      <td>
        <button onclick="editar(${i})">Editar</button>
        <button onclick="excluir(${i})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

function editar(i) {
  const l = lancamentos[i];
  document.getElementById("vencimento").value = l.vencimento;
  document.getElementById("descricao").value = l.descricao;
  document.getElementById("valor").value = l.valor;
  document.getElementById("tipo").value = l.tipo;
  document.getElementById("nome").value = l.nome;
  document.getElementById("situacao").value = l.situacao;
  editandoIndex = i;
}

function excluir(i) {
  if (confirm("Confirma excluir?")) {
    lancamentos.splice(i, 1);
    salvar();
  }
}

function exportarJSON() {
  const blob = new Blob([JSON.stringify(lancamentos, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lancamentos.json";
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("importar-json").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (evt) {
    lancamentos = JSON.parse(evt.target.result);
    salvar();
  };
  reader.readAsText(file);
});

carregarTabela();
