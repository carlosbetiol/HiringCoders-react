import React, { useEffect, useState } from 'react';
import * as S from './styled';

export default function Repositories() {
    const [ repositories, setRepositories ] = useState([]);
    useEffect(() => {
        let repositoriesName = localStorage.getItem('repositoriesName');
        repositoriesName = JSON.parse(repositoriesName);
        setRepositories(repositoriesName);
        localStorage.clear();
    }, []); // parametro vazio pq eh para fazer quando ja entra na pagina, sem variavel monitorada

    return (
        <S.Container>
        <S.Title>Repositórios</S.Title>
        <S.List>
            { repositories.map(repository => {
                return (
                    <S.ListItem>Repositório: { repository }</S.ListItem>
                )
            })}
            
        </S.List>
        </S.Container>
    )
}
