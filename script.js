let dados = [];

function carregarTabela() {
  const tbody = document.getElementById("tabela-lancamentos");
  tbody.innerHTML = "";

  dados.forEach((l) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${l.vencimento || ""}</td>
      <td>${l.descricao}</td>
      <td>${l.tipo}</td>
      <td>R$ ${parseFloat(l.valor).toFixed(2)}</td>
      <td>${l.nome}</td>
      <td>${l.situacao}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("upload-json").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (evt) {
    dados = JSON.parse(evt.target.result);
    carregarTabela();
  };
  reader.readAsText(file);
});

function baixarJSON() {
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fluxo_2025.json";
  a.click();
  URL.revokeObjectURL(url);
}
