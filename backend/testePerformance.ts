import fetch from "node-fetch";

// medir latência (cliente -> servidor -> cliente)
async function medirLatencia() {
  const inicio = performance.now();
  await fetch("http://localhost:3000/medicoes/ping");
  const fim = performance.now();
  return fim - inicio;
}

// medir tempo de resposta total
async function medirResposta() {
  const inicio = performance.now();
  await fetch("http://localhost:3000/medicoes/relatorio-medicao");
  const fim = performance.now();
  return fim - inicio;
}

// simular n usuários simultâneos
async function testarCarga(n: number) {
  const promessas: Promise<number>[] = [];

  for (let i = 0; i < n; i++) {
    promessas.push(medirResposta());
  }

  return Promise.all(promessas);
}

// executar tudo
(async () => {
  console.log("=== LATÊNCIA ===");
  console.log("Latência (ms):", await medirLatencia());

  console.log("\n=== TEMPO DE RESPOSTA ===");
  console.log("Resposta 1 usuário:", await medirResposta());

  console.log("\n=== TESTE DE CARGA ===");
  console.log("5 usuários:", await testarCarga(5));
  console.log("10 usuários:", await testarCarga(10));
})();
