// O mapper é responsável por formatar os dados antes de enviar na resposta
// Assim o Service fica só com as regras de negócio, sem se preocupar com formatação

// export function formatarEntregador(entregador: any) {
//   return {
//     id: entregador.id,
//     nome: entregador.nome,
//     telefone: entregador.telefone,
//     cpf: entregador.cpf,
//     cnh: entregador.cnh,
//     status: entregador.status,
//     foto: entregador.foto
//       ? `data:image/jpeg;base64,${entregador.foto.toString('base64')}`
//       : null,
//     veiculo: entregador.veiculo
//       ? {
//           id: entregador.veiculo.id,
//           tipo: entregador.veiculo.tipo,
//           placa: entregador.veiculo.placa,
//           modelo: entregador.veiculo.modelo
//         }
//       : null
//   }
// }


export function formatarEntregador(entregador: any) {
  return {
    id: entregador.id,
    nome: entregador.nome,
    telefone: entregador.telefone,
    cpf: entregador.cpf,
    cnh: entregador.cnh,
    status: entregador.status,
    pedidoAtualId: entregador.pedidoAtualId || null,
    foto: entregador.foto
      ? `data:image/jpeg;base64,${entregador.foto.toString('base64')}`
      : null,
    veiculo: entregador.veiculo
      ? {
          id: entregador.veiculo.id,
          tipo: entregador.veiculo.tipo,
          placa: entregador.veiculo.placa,
          modelo: entregador.veiculo.modelo
        }
      : null
  }
}