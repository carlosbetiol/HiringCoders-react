import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function App(props) {
  const history = useHistory();
  const [usuario, setUsuario] = useState('')
  // acima desestruturacao para ja colocar o retorno do useState pois esta retorna um array conforme comentario no final do arquivo
  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => {
      const repositories = response.data;
      const repositoriesName = [];
      repositories.map((repository) => {
        repositoriesName.push(repository.name);
      });
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      history.push('/repositories');
    });
  }
  return (
    <>
      {/* <h1>{ props.title } { props.user }</h1> (recebe propriedades vindas do componente index.js*/}
      <S.Container>
        <S.Input className="usuarioInput" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Container>
    </>
  );
}

export default App;

// useState vai retornar uma array [ usuario, setUsuario ] - primeira posicao o valor do estado, e na segunda
// uma funçao que trata o estado usado para setar
