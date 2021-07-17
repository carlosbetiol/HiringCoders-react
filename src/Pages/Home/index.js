import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function App(props) {
  const history = useHistory();
  const [usuario, setUsuario] = useState('')
  const [erro, setErro] = useState(false);

  // acima desestruturacao para ja colocar o retorno do useState pois esta retorna um array conforme comentario no final do arquivo
  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
      .then(response => {
        const repositories = response.data;
        const repositoriesName = [];
        repositories.map((repository) => {
          repositoriesName.push(repository.name);
        });
        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
        setErro(false);
        history.push('/repositories');
      })
      .catch(err => {
        setErro(true);
      });
  }
  return (
    <S.HomeContainer>
      {/* <h1>{ props.title } { props.user }</h1> (recebe propriedades vindas do componente index.js*/}
      <S.Content>
        <S.Input className="usuarioInput" placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : ''}
    </S.HomeContainer>
  );
}

export default App;

// useState vai retornar uma array [ usuario, setUsuario ] - primeira posicao o valor do estado, e na segunda
// uma funçao que trata o estado usado para setar
