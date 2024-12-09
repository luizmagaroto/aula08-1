import { useEffect, useState } from "react";

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios])

  const removerPessoa = async(id) => {
try{
   await fetch('http://localhost:3000/usuarios/'+id, {
method: 'DELETE',
   })
}catch{
  alert("erro!")
}
  }
const exportandopdf = () => {
  const doc = new jsPDF();
  const tabela = usuarios.map(usuario=> {
    usuario.nome,
    usuario.email
  });
  doc.text("Lista de Usuário", 10, 10);
  doc.autoTable({
    head: [["Nome", "Email"]],
    body: tabela
  });

  doc.save("alunos.pdf");
}

  return (
    <div>
      <button onClick={()=>exportandopdf()}></button>
      <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td><button onClick={()=> removerPessoa(usuario.id)}>X</button></td>
        </tr>
      )}
    </table>
    </div>
  );
      }