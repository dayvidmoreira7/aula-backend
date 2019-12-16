renderAlunos = (alunos) => {
    $('#corpo-da-tabela').html('');
    for(aluno of alunos) {
        $('#corpo-da-tabela').append(`
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.email}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onclick="iniciarUpdateAluno('${aluno.nome}', '${aluno.idade}', '${aluno.email}', '${aluno._id}')" data-toggle="modal" data-target="#editarAluno" class="btn btn-outline-primary">Editar</button>
                    <button type="button" onclick="deleteAluno('${aluno._id}')" class="btn btn-outline-danger">Excluir</button>
                    </div>
                </td>
            </tr>
        `)
    }
}

deleteAluno = (id) => {
    axios.delete(`http://localhost:8080/delete/${id}`).then(response => {
        window.location.reload();
    }).catch(error => {
        console.log('Azedou');
    })
}

let aluno_editar = '';
iniciarUpdateAluno = (nome, idade, email, id) => {
    $('#edit-name').val(nome);
    $('#edit-years').val(idade);
    $('#edit-email').val(email);
    aluno_editar = id;
}

$(jQuery).ready(() => {
    axios.get('http://localhost:8080/alunos').then(response => {
        renderAlunos(response.data);
    }).catch(error => {
        console.log('Azedou');
    })
})

$('#aluno-form').submit(e => {
    e.preventDefault();
    let aluno = {
        nome: $('#name').val(),
        idade: $('#years').val(),
        email: $('#email').val(),
    }

    axios.post('http://localhost:8080/create', aluno).then(response => {
        window.location.reload();
    }).catch(error => {
        console.log('Esse e-mail ja existe');
    })
});
$('#edit-aluno-form').submit(e => {
    e.preventDefault();
    let aluno = {
        nome: $('#edit-name').val(),
        idade: $('#edit-years').val(),
        email: $('#edit-email').val(),
    }

    axios.put(`http://localhost:8080/update/${aluno_editar}`, aluno).then(response => {
        window.location.reload();
    }).catch(error => {
        console.log('Deu ruim');
    })
});