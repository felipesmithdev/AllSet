​
    // criação de objeto da empresa para cadastro

    var empresa = {

 

    }  ;

 

    // Criação de um objeto de endereço da empresa para cadastro

    var endereco = {

 

    }

 

    // criação de um objeto para o usuário

    var usuario = {

        isSupervisor: true

 

    }

   

   

    var valor_nome_empresa = '';

    var valor_cnpj = '';

    var valor_telefone_empresa = '';

    var valor_cep_empresa = '';

 

    var valor_logradouro = '';

    var valor_cidade ='';

    var valor_uf = 'AC';

    var valor_numero = '';

    var valor_complemento = '';

 

    var valor_nome_usuario = '';

    var valor_email_usuario = '';

    var valor_senha_usuario = '';

   

    var nome_empresa_valido = false;

    var cnpj_valido = false;

    var telefone_comercial_valido = false;

    var cep_valido = false;

 

    var logradouro_valido = false;

    var cidade_valida = false;

    var uf_valido = true;

    var numero_valido = false;

    var complemento_valido = false;

 

    var nome_usuario_valido = false;

    var email_usuario_valido = false;

    var senha_usuario_valida = false;

    var confirmacao_usuario_valida = false;

 

    function validarNomeEmpresa() {

        valor_nome_empresa = ipt_nome_empresa.value;

        var empresa_lower = valor_nome_empresa.toLowerCase();

        var empresa_upper = valor_nome_empresa.toUpperCase();

        var possui_letras = empresa_lower != empresa_upper;

        if (valor_nome_empresa != '' && possui_letras == true && valor_nome_empresa.length >= 3 && valor_nome_empresa.length <= 64) {

            span_validar_nome_empresa.innerHTML = `Razão Social validada com sucesso`;

            span_validar_nome_empresa.style.color = '#069206';

            valor_nome_empresa = valor_nome_empresa.toUpperCase()

            nome_empresa_valido = true;

        } else if (possui_letras == false) {

            span_validar_nome_empresa.style.color = 'red'

            span_validar_nome_empresa.innerHTML = `A Razão Social deve possuir letras`;

            nome_empresa_valido = false;

        } else if (valor_nome_empresa.length < 3) {

            span_validar_nome_empresa.style.color = 'red'

            span_validar_nome_empresa.innerHTML = `A Razão Social deve ter no mínimo 3 caracteres`;

            nome_empresa_valido = false;

        }

    }

    function validarCNPJ() {

        valor_cnpj = ipt_cnpj.value;

        var tamanho_cnpj = valor_cnpj.length

        var possui_caractere_especial = valor_cnpj.includes('@') || valor_cnpj.includes('!') || valor_cnpj.includes("'") || valor_cnpj.includes(`"`) || valor_cnpj.includes('#') || valor_cnpj.includes('$') || valor_cnpj.includes('%') || valor_cnpj.includes('¨') || valor_cnpj.includes('&') || valor_cnpj.includes('*') || valor_cnpj.includes(`)`) || valor_cnpj.includes(`(`) || valor_cnpj.includes('_') || valor_cnpj.includes('-') || valor_cnpj.includes('=') || valor_cnpj.includes('+') || valor_cnpj.includes('§') || valor_cnpj.includes('|') || valor_cnpj.includes('\u005C') || valor_cnpj.includes('`') || valor_cnpj.includes('´') || valor_cnpj.includes('[') || valor_cnpj.includes(']') || valor_cnpj.includes('{') || valor_cnpj.includes('}') || valor_cnpj.includes('^') || valor_cnpj.includes('~') || valor_cnpj.includes('ª') || valor_cnpj.includes('º') || valor_cnpj.includes('<') || valor_cnpj.includes('>') || valor_cnpj.includes(',') || valor_cnpj.includes('.') || valor_cnpj.includes(':') || valor_cnpj.includes(';') || valor_cnpj.includes('?') || valor_cnpj.includes('/') || valor_cnpj.includes('°') || valor_cnpj.includes('¹') || valor_cnpj.includes('²') || valor_cnpj.includes('³') || valor_cnpj.includes('£') || valor_cnpj.includes('¢') || valor_cnpj.includes('¬') ;

        if (valor_cnpj != '' && possui_caractere_especial == false && tamanho_cnpj == 14) {

            span_validar_cnpj.style.color = '#069206'

            span_validar_cnpj.innerHTML = `CNPJ preenchido com sucesso`;

            cnpj_valido = true;

        } else if(valor_cnpj == ''){

            span_validar_cnpj.style.color = 'red'

            span_validar_cnpj.innerHTML = `Preencha o CNPJ para continuar`;

            cnpj_valido = false;

        } else if(possui_caractere_especial == true){

            span_validar_cnpj.style.color = 'red'

            span_validar_cnpj.innerHTML = `o CNPJ deve possuir apenas números`;

            cnpj_valido = false;

        } else if(tamanho_cnpj != 14){

            span_validar_cnpj.style.color = 'red'

            span_validar_cnpj.innerHTML = `o CNPJ deve possuir apenas 14 caracteres`;

            cnpj_valido = false;

        }

    }

    function validarTelefone() {

        valor_telefone_empresa = ipt_telefone_comercial.value;

        var tamanho_telefone = valor_telefone_empresa.length

        var possui_e = valor_telefone_empresa.includes('e')

        if (valor_telefone_empresa != '' && possui_e == false && tamanho_telefone == 11) {

            span_validar_telefone.style.color = '#069206'

            span_validar_telefone.innerHTML = `Telefone preenchido com sucesso`;

            telefone_comercial_valido = true;

        } else if(valor_telefone_empresa == ''){

            span_validar_telefone.style.color = 'red'

            span_validar_telefone.innerHTML = `Preencha o campo para continuar`;

            telefone_comercial_valido = false;

        } else if(possui_e == true){

            span_validar_telefone.style.color = 'red'

            span_validar_telefone.innerHTML = `Apenas números são permitidos`;

            telefone_comercial_valido = false;

        } else if(tamanho_telefone != 11){

            span_validar_telefone.style.color = 'red'

            span_validar_telefone.innerHTML = `O Telefone tem de ter apenas 11 números`;

            telefone_comercial_valido = false;

        }

}

function validarCEP() {

        valor_cep_empresa = ipt_cep.value;

        var tamanho_cep = valor_cep_empresa.length

        var possui_e = valor_cep_empresa.includes('e')

        if (valor_telefone_empresa != '' && possui_e == false && tamanho_cep == 8) {

            span_validar_cep.style.color = '#069206'

            span_validar_cep.innerHTML = `CEP preenchido com sucesso`;

            cep_valido = true;

        } else if(valor_telefone_empresa == ''){

            span_validar_cep.style.color = 'red'

            span_validar_cep.innerHTML = `Preencha o campo para continuar`;

            cep_valido = false;

        } else if(possui_e == true){

            span_validar_cep.style.color = 'red'

            span_validar_cep.innerHTML = `Apenas números são permitidos`;

            cep_valido = false;

        } else if(tamanho_cep != 8){

            span_validar_cep.style.color = 'red'

            span_validar_cep.innerHTML = `O CEP tem de ter somente 8 números`;

            cep_valido = false;

        }

}

    function validarParte1() {

        if (nome_empresa_valido == true && cnpj_valido == true && telefone_comercial_valido == true && cep_valido == true) {

            // caso as validações tenham sido cumpridas, armazenamos os valores dentro do objeto de usuário

            empresa.razaoSocial = valor_nome_empresa;

            empresa.cnpj = valor_cnpj;

            empresa.telefone = valor_telefone_empresa;

            endereco.cep = valor_cep_empresa;

            // exibição da parte 2 do cadastro

            cadastroParte1.style.display = 'none'

            cadastroParte2.style.display = 'flex'

        } else {

            modal_mensagem_erro.style.display = 'flex';

            modal_erro.style.display = 'flex';

        }

    }

    function validarLogradouro() {

        valor_logradouro = ipt_logradouro.value;

        var logradouro_lower = valor_logradouro.toLowerCase();

        var logradouro_upper = valor_logradouro.toUpperCase();

        var possui_letras = logradouro_lower != logradouro_upper;

        var possui_caractere_especial = valor_logradouro.includes('@') || valor_logradouro.includes('!') || valor_logradouro.includes("'") || valor_logradouro.includes(`"`) || valor_logradouro.includes('#') || valor_logradouro.includes('$') || valor_logradouro.includes('%') || valor_logradouro.includes('¨') || valor_logradouro.includes('&') || valor_logradouro.includes('*') || valor_logradouro.includes(`)`) || valor_logradouro.includes(`(`) || valor_logradouro.includes('_') || valor_logradouro.includes('-') || valor_logradouro.includes('=') || valor_logradouro.includes('+') || valor_logradouro.includes('§') || valor_logradouro.includes('|') || valor_logradouro.includes('\u005C') || valor_logradouro.includes('[') || valor_logradouro.includes(']') || valor_logradouro.includes('{') || valor_logradouro.includes('}') || valor_logradouro.includes('^') || valor_logradouro.includes('<') || valor_logradouro.includes('>') || valor_logradouro.includes(':') || valor_logradouro.includes(';') || valor_logradouro.includes('?') || valor_logradouro.includes('/') || valor_logradouro.includes('°') || valor_logradouro.includes('¹') || valor_logradouro.includes('²') || valor_logradouro.includes('³') || valor_logradouro.includes('£') || valor_logradouro.includes('¢') || valor_logradouro.includes('¬') ;

        if (valor_logradouro != '' && valor_logradouro.length >= 3 && valor_logradouro.length <= 64 && possui_letras == true && possui_caractere_especial == false) {

            span_validar_logradouro.innerHTML = `Logradouro validado com sucesso`;

            span_validar_logradouro.style.color = '#069206';

            valor_logradouro = valor_logradouro.toUpperCase()

            logradouro_valido = true;

        } else if (valor_logradouro == ''){

            span_validar_logradouro.style.color = 'red'

            span_validar_logradouro.innerHTML = `Preencha o campo para continuar`;

            logradouro_valido = false;

        }  else if (valor_logradouro.length < 3 || valor_logradouro.length > 64){

            span_validar_logradouro.style.color = 'red'

            span_validar_logradouro.innerHTML = `O Logradouro deve ter de 3 a 64 caracteres`;

            logradouro_valido = false;

        } else if (possui_caractere_especial == true){

            span_validar_logradouro.style.color = 'red'

            span_validar_logradouro.innerHTML = `O Logradouro não deve ter caracteres especiais`;

            logradouro_valido = false;

        } else if (possui_letras == false){

            span_validar_logradouro.style.color = 'red'

            span_validar_logradouro.innerHTML = `O Logradouro deve possuir letras`;

            logradouro_valido = false;

        }

       

    }

    function validarCidade() {

        valor_cidade = ipt_cidade.value;

        var cidade_lower = valor_cidade.toLowerCase();

        var cidade_upper = valor_cidade.toUpperCase();

        var possui_letras = cidade_lower != cidade_upper;

        var possui_numeros = valor_cidade.includes('1') || valor_cidade.includes('2') || valor_cidade.includes("3") || valor_cidade.includes(`4`) || valor_cidade.includes('5') || valor_cidade.includes('6') || valor_cidade.includes('7') || valor_cidade.includes('8') || valor_cidade.includes('9') || valor_cidade.includes('0');

        var possui_caractere_especial = valor_cidade.includes('@') || valor_cidade.includes('!') || valor_cidade.includes("'") || valor_cidade.includes(`"`) || valor_cidade.includes('#') || valor_cidade.includes('$') || valor_cidade.includes('%') || valor_cidade.includes('¨') || valor_cidade.includes('&') || valor_cidade.includes('*') || valor_cidade.includes(`)`) || valor_cidade.includes(`(`) || valor_cidade.includes('_') || valor_cidade.includes('-') || valor_cidade.includes('=') || valor_cidade.includes('+') || valor_cidade.includes('§') || valor_cidade.includes('|') || valor_cidade.includes('\u005C') || valor_cidade.includes('[') || valor_cidade.includes(']') || valor_cidade.includes('{') || valor_cidade.includes('}') || valor_cidade.includes('<') || valor_cidade.includes('>') || valor_cidade.includes(':') || valor_cidade.includes(';') || valor_cidade.includes('?') || valor_cidade.includes('/') || valor_cidade.includes('°') || valor_cidade.includes('¹') || valor_cidade.includes('²') || valor_cidade.includes('³') || valor_cidade.includes('£') || valor_cidade.includes('¢') || valor_cidade.includes('¬') ;

        if (valor_cidade != '' && valor_cidade.length >= 3 && possui_numeros == false && possui_letras == true && possui_caractere_especial == false && valor_cidade.length <= 64) {

            span_validar_cidade.innerHTML = `Nome de cidade validado com sucesso`;

            span_validar_cidade.style.color = '#069206';

            valor_cidade = valor_cidade.toUpperCase();

            cidade_valida = true;

        } else if (valor_cidade == "") {

            span_validar_cidade.style.color = 'red'

            span_validar_cidade.innerHTML = `Preencha o campo para continuar`;

            cidade_valida = false;

        } else if (possui_caractere_especial == true) {

            span_validar_cidade.style.color = 'red'

            span_validar_cidade.innerHTML = `A cidade não deve ter caracteres especiais`;

            cidade_valida = false;

        }else if (possui_numeros == true){

            span_validar_cidade.style.color = 'red'

            span_validar_cidade.innerHTML = `Números no nome da cidade não são permitidos`;

            cidade_valida = false;

        } else if (valor_cidade.length < 3){

            span_validar_cidade.style.color = 'red'

            span_validar_cidade.innerHTML = `O nome deve ter no mínimo 3 caracteres`;

            cidade_valida = false;

        } else if (possui_letras == false){

            span_validar_cidade.style.color = 'red'

            span_validar_cidade.innerHTML = `O nome da cidade deve ter apenas letras`;

            cidade_valida = false;

        }

    }

    function validarEstado() {

        valor_uf = slt_uf.value;

        uf_valido = true;

    }

    function validarNumero() {

        valor_numero = ipt_numero.value;

        var possui_e = valor_numero.includes('e')

        if (valor_numero != '' && possui_e == false) {

            span_validar_numero.style.color = '#069206'

            span_validar_numero.innerHTML = `Número preenchido com sucesso`;

            numero_valido = true;

        } else if(valor_numero == ''){

            span_validar_numero.style.color = 'red'

            span_validar_numero.innerHTML = `Preencha o campo para continuar`;

            numero_valido = false;

        } else if(possui_e == true){

            span_validar_numero.style.color = 'red'

            span_validar_numero.innerHTML = `Apenas números são permitidos`;

            numero_valido = false;

        }

    }

    function validarComplemento() {

        valor_complemento = ipt_cidade.value;

        if (valor_complemento != '' && valor_complemento.length >= 3) {

            span_validar_complemento.innerHTML = `Complemento validado com sucesso`;

            span_validar_complemento.style.color = '#069206';

            complemento_valido = true;

        } else {

            span_validar_complemento.style.color = 'red'

            span_validar_complemento.innerHTML = `O Complemento tem de ter no mínimo 6 caracteres`;

            complemento_valido = false;

        }

    }

    function voltarToParte1() {

        cadastroParte2.style.display = 'none'

        cadastroParte1.style.display = 'flex'

    }

    function validarParte2() {

        if (logradouro_valido == true && cidade_valida == true && uf_valido == true && numero_valido == true && complemento_valido == true) {

           // caso as validações tenham sido cumpridas, armazenamos os valores dentro do objeto de usuário

           endereco.logradouro = valor_logradouro;

           endereco.cidade = valor_cidade;

           endereco.uf = valor_uf;

           endereco.numero = valor_numero;

           endereco.complemento = valor_complemento;

 

           // exibição da parte 3 do cadastro

            cadastroParte2.style.display = 'none'

            cadastroParte3.style.display = 'flex'

        } else {

            modal_mensagem_erro.style.display = 'flex';

            modal_erro.style.display = 'flex';

           

        }

    }

    function validarNomeUsuario() {

        valor_nome_usuario = ipt_nome_usuario.value;

        var nome_usuario_lower = valor_nome_usuario.toLowerCase();

        var nome_usuario_upper = valor_nome_usuario.toUpperCase();

        var possui_letras = nome_usuario_lower != nome_usuario_upper;

        var possui_numeros = valor_nome_usuario.includes('1') || valor_nome_usuario.includes('2') || valor_nome_usuario.includes("3") || valor_nome_usuario.includes(`4`) || valor_nome_usuario.includes('5') || valor_nome_usuario.includes('6') || valor_nome_usuario.includes('7') || valor_nome_usuario.includes('8') || valor_nome_usuario.includes('9') || valor_nome_usuario.includes('0');

        var possui_caractere_especial = valor_nome_usuario.includes('@') || valor_nome_usuario.includes('!') || valor_nome_usuario.includes("'") || valor_nome_usuario.includes(`"`) || valor_nome_usuario.includes('#') || valor_nome_usuario.includes('$') || valor_nome_usuario.includes('%') || valor_nome_usuario.includes('¨') || valor_nome_usuario.includes('&') || valor_nome_usuario.includes('*') || valor_nome_usuario.includes(`)`) || valor_nome_usuario.includes(`(`) || valor_nome_usuario.includes('_') || valor_nome_usuario.includes('-') || valor_nome_usuario.includes('=') || valor_nome_usuario.includes('+') || valor_nome_usuario.includes('§') || valor_nome_usuario.includes('|') || valor_nome_usuario.includes('\u005C') || valor_nome_usuario.includes('[') || valor_nome_usuario.includes(']') || valor_nome_usuario.includes('{') || valor_nome_usuario.includes('}') || valor_nome_usuario.includes('^') || valor_nome_usuario.includes('<') || valor_nome_usuario.includes('>') || valor_nome_usuario.includes(':') || valor_nome_usuario.includes(';') || valor_nome_usuario.includes('?') || valor_nome_usuario.includes('/') || valor_nome_usuario.includes('°') || valor_nome_usuario.includes('¹') || valor_nome_usuario.includes('²') || valor_nome_usuario.includes('³') || valor_nome_usuario.includes('£') || valor_nome_usuario.includes('¢') || valor_nome_usuario.includes('¬') ;

        if (valor_nome_usuario != '' && valor_nome_usuario.length >= 3 && possui_letras == true && possui_caractere_especial == false && possui_numeros == false && valor_nome_usuario.length <= 64) {

            span_validar_nome_usuario.innerHTML = `Nome de usuário validado com sucesso`;

            span_validar_nome_usuario.style.color = '#069206';

            valor_nome_usuario = valor_nome_usuario.toLowerCase()

            nome_usuario_valido = true;

        } else if (possui_caractere_especial == true) {

            span_validar_nome_usuario.style.color = 'red'

            span_validar_nome_usuario.innerHTML = `O nome não deve ter caracteres especiais`;

            nome_usuario_valido = false;

        } else if (possui_numeros == true) {

            span_validar_nome_usuario.style.color = 'red'

            span_validar_nome_usuario.innerHTML = `O nome não deve conter números`;

            nome_usuario_valido = false;

        } else if (valor_nome_usuario.length < 3){

            span_validar_nome_usuario.style.color = 'red'

            span_validar_nome_usuario.innerHTML = `O nome deve ter no mínimo 3 caracteres`;

            nome_usuario_valido = false;

        } else if (possui_letras == false){

            span_validar_nome_usuario.style.color = 'red'

            span_validar_nome_usuario.innerHTML = `O nome deve ter apenas letras`;

            nome_usuario_valido = false;

        }

    }

    function validarEmail (){

        valor_email_usuario = ipt_email.value;

        var email_usuario_upper = valor_email_usuario.toUpperCase();

        var email_usuario_lower = valor_email_usuario.toLowerCase();

        var possui_apenas_minusculas = email_usuario_upper != valor_email_usuario;

        var tamanho_email = valor_email_usuario.length;

        var possui_letras = email_usuario_upper != email_usuario_lower;

        var possui_arroba = valor_email_usuario.includes('@');

        var indice_arroba = valor_email_usuario.indexOf('@') + 1;

        var possui_caractere_especial = valor_email_usuario.includes('!') || valor_email_usuario.includes("'") || valor_email_usuario.includes(`"`) || valor_email_usuario.includes('#') || valor_email_usuario.includes('$') || valor_email_usuario.includes('%') || valor_email_usuario.includes('¨') || valor_email_usuario.includes('&') || valor_email_usuario.includes('*') || valor_email_usuario.includes(`)`) || valor_email_usuario.includes(`(`) || valor_email_usuario.includes('_') || valor_email_usuario.includes('-') || valor_email_usuario.includes('=') || valor_email_usuario.includes('+') || valor_email_usuario.includes('§') || valor_email_usuario.includes('|') || valor_email_usuario.includes('\u005C') || valor_email_usuario.includes('`') || valor_email_usuario.includes('´') || valor_email_usuario.includes('[') || valor_email_usuario.includes(']') || valor_email_usuario.includes('{') || valor_email_usuario.includes('}') || valor_email_usuario.includes('^') || valor_email_usuario.includes('~') || valor_email_usuario.includes('ª') || valor_email_usuario.includes('º') || valor_email_usuario.includes('<') || valor_email_usuario.includes('>') || valor_email_usuario.includes(',') || valor_email_usuario.includes(':') || valor_email_usuario.includes(';') || valor_email_usuario.includes('?') || valor_email_usuario.includes('/') || valor_email_usuario.includes('°') || valor_email_usuario.includes('¹') || valor_email_usuario.includes('²') || valor_email_usuario.includes('³') || valor_email_usuario.includes('£') || valor_email_usuario.includes('¢') || valor_email_usuario.includes('¬') ;

        var possui_ponto_depois_arroba = valor_email_usuario.includes('.', indice_arroba);

        var indice_ponto_depois_arroba = valor_email_usuario.indexOf('.', indice_arroba) - indice_arroba;

        if (valor_email_usuario != '' && possui_apenas_minusculas == true && possui_arroba == true && indice_arroba > 1 && indice_arroba < tamanho_email && possui_ponto_depois_arroba == true && possui_caractere_especial == false && indice_ponto_depois_arroba >= 2 && (indice_ponto_depois_arroba + indice_arroba+1) < tamanho_email &&  (indice_ponto_depois_arroba + indice_arroba+1) < (tamanho_email - 2)) {

            span_validar_email.style.color = '#069206'

            span_validar_email.innerHTML = `endereço de email preenchido com sucesso`;

            valor_email_usuario = valor_email_usuario.toLowerCase();

            email_usuario_valido = true;

        } else if(valor_email_usuario == ''){

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `Preencha o campo para continuar`;

            email_usuario_valido = false;

        }  else if(tamanho_email < 3) {

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `O endereço de email deve ser maior`;

            email_usuario_valido = false;

        } else if(possui_caractere_especial == true) {

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `O email não pode ter caracteres especiais`;

            email_usuario_valido = false;

        }else if(possui_letras == false) {

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `O email deve ter apenas letras minusculas.`;

            email_usuario_valido = false;

        } else if(possui_arroba == false) {

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `O email precisa ter @`;

            email_usuario_valido = false;

        } else if(indice_arroba == 1){

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `O @ não pode ser o primeiro caractere`;

            email_usuario_valido = false;

        } else if(indice_arroba < 3){

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `Deve ter no mínimo 3 caracteres antes do @`;

            email_usuario_valido = false;

        }  else if(indice_arroba == tamanho_email){

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `O @ não pode ser o último caractere`;

            email_usuario_valido = false;

        } else if(possui_ponto_depois_arroba == false) {

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `O email precisa ter extensão após o @`;

            email_usuario_valido = false;

        } else if(indice_ponto_depois_arroba < 2) {

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `A extensão tem de estar no mínimo a 3 caracteres do @`;

            email_usuario_valido = false;

        } else if(indice_ponto_depois_arroba+indice_arroba +1 >= tamanho_email) {

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `O ponto não pode ser o último caractere`;

            email_usuario_valido = false;

        } else if(indice_ponto_depois_arroba+indice_arroba +1 >= tamanho_email-2) {

            span_validar_email.style.color = 'red'

            span_validar_email.innerHTML = `O dominio após o ponto deve ter no mínimo 3 caracteres`;

            email_usuario_valido = false;

        }

    }

    function validarSenha() {

        valor_senha_usuario = ipt_senha_usuario.value;

        var tamanho_senha = valor_senha_usuario.length;

        var possui_caractere_especial = valor_senha_usuario.includes('@') || valor_senha_usuario.includes('!') || valor_senha_usuario.includes("'") || valor_senha_usuario.includes(`"`) || valor_senha_usuario.includes('#') || valor_senha_usuario.includes('$') || valor_senha_usuario.includes('%') || valor_senha_usuario.includes('¨') || valor_senha_usuario.includes('&') || valor_senha_usuario.includes('*') || valor_senha_usuario.includes(`)`) || valor_senha_usuario.includes(`(`) || valor_senha_usuario.includes('_') || valor_senha_usuario.includes('-') || valor_senha_usuario.includes('=') || valor_senha_usuario.includes('+') || valor_senha_usuario.includes('§') || valor_senha_usuario.includes('|') || valor_senha_usuario.includes('\u005C') || valor_senha_usuario.includes('`') || valor_senha_usuario.includes('´') || valor_senha_usuario.includes('[') || valor_senha_usuario.includes(']') || valor_senha_usuario.includes('{') || valor_senha_usuario.includes('}') || valor_senha_usuario.includes('^') || valor_senha_usuario.includes('~') || valor_senha_usuario.includes('ª') || valor_senha_usuario.includes('º') || valor_senha_usuario.includes('<') || valor_senha_usuario.includes('>') || valor_senha_usuario.includes(',') || valor_senha_usuario.includes('.') || valor_senha_usuario.includes(':') || valor_senha_usuario.includes(';') || valor_senha_usuario.includes('?') || valor_senha_usuario.includes('/') || valor_senha_usuario.includes('°') || valor_senha_usuario.includes('¹') || valor_senha_usuario.includes('²') || valor_senha_usuario.includes('³') || valor_senha_usuario.includes('£') || valor_senha_usuario.includes('¢') || valor_senha_usuario.includes('¬') ;

        var possui_numeros = valor_senha_usuario.includes('1') || valor_senha_usuario.includes('2') || valor_senha_usuario.includes('3') || valor_senha_usuario.includes('4') || valor_senha_usuario.includes('5') || valor_senha_usuario.includes('6') || valor_senha_usuario.includes('7') || valor_senha_usuario.includes('8') || valor_senha_usuario.includes('9') || valor_senha_usuario.includes('0');

        var SENHA_MAIUSCULA = valor_senha_usuario.toUpperCase();

        var senha_minuscula = valor_senha_usuario.toLowerCase();

        if (valor_senha_usuario != '' && senha_minuscula != valor_senha_usuario && SENHA_MAIUSCULA != valor_senha_usuario && possui_caractere_especial == true && possui_numeros == true && tamanho_senha >= 8) {

            span_validar_senha.style.color = '#069206'

            span_validar_senha.innerHTML = `Senha validada com sucesso`;

            senha_usuario_valida = true;

        } else if(valor_senha_usuario == '') {

            span_validar_senha.style.color = 'red'

            span_validar_senha.innerHTML = `Preencha a senha para continuar`;

            senha_usuario_valida = false;

        } else if(valor_senha_usuario == senha_minuscula) {

            span_validar_senha.style.color = 'red'

            span_validar_senha.innerHTML = `A senha deve conter pelo menos uma letra maiuscula`;

            senha_usuario_valida = false;

        } else if(valor_senha_usuario == SENHA_MAIUSCULA) {

            span_validar_senha.style.color = 'red'

            span_validar_senha.innerHTML = `A senha deve conter pelo menos uma letra minuscula`;

            senha_usuario_valida = false;

        } else if (possui_caractere_especial == false) {

            span_validar_senha.style.color = 'red'

            span_validar_senha.innerHTML = `A senha deve conter pelo menos um caractere especial`;

            senha_usuario_valida = false;

        } else if (possui_numeros == false) {

            span_validar_senha.style.color = 'red'

            span_validar_senha.innerHTML = `A senha deve conter pelo menos um número`;

            senha_usuario_valida = false;

        } else if (tamanho_senha < 8){

            span_validar_senha.style.color = 'red'

            span_validar_senha.innerHTML = `A senha deve conter no mínimo 8 caracteres`;

            senha_usuario_valida = false;

        }                

    }

           

    function validarConfirmacao() {

        valor_senha_usuario = ipt_senha_usuario.value

        var confirmarSenha = ipt_confirme_senha.value;

        if (confirmarSenha == valor_senha_usuario) {

            span_validar_confirmacao.style.color = '#069206'

            span_validar_confirmacao.innerHTML = `senha confirmada com sucesso`;

            confirmacao_usuario_valida = true

        } else {

            span_validar_confirmacao.style.color = 'red'

            span_validar_confirmacao.innerHTML = `A senha está diferente`;

            confirmacao_usuario_valida = false;

        }

    }

    function voltarToParte2() {

        cadastroParte3.style.display = 'none'

        cadastroParte2.style.display = 'flex'

    }

    function validarParte3() {

        if (nome_usuario_valido == true && email_usuario_valido == true && senha_usuario_valida == true && confirmacao_usuario_valida == true) {

             // caso as validações tenham sido cumpridas, armazenamos os valores dentro do objeto de usuário

             usuario.nome = valor_nome_usuario;

             usuario.email = valor_email_usuario;

             usuario.senha = valor_senha_usuario;

 

           /* Com todas as informações coletadas, devemos inserí-las no banco de dados.

              Para isso, usaremos o método .fetch() para fazer uma requisição para nosso backend.

              De acordo com a modelagem, precisamos fazer 3 cadastros:

              1. Empresa

              2. Endereço

              3. Usuário

              Logo, são 3 requisições diferentes.

           */

 

            /* O método fetch exige que enviemos 2 informações para ele:

            A primeira é a rota onde enviaremos nossa requisição, nesse caso é na /empresa/cadastrar, definido no app.js e em routes/empresa.js

            A segunda informação são as configurações da requisição, como por exemplo: tipo de requisição (POST, GET, etc..), o conteúdo dessa requisição (afinal, se vamos cadastrar algo no banco, precisamos informar o que queremos cadastrar)

           

            */

          fetch("/empresas/cadastrar", {

            // Como dito anteriormente, aqui definimos o tipo da requisição

            method: "POST",

            // Aqui definimos os "cabeçalhos" da requisição, como por exemplo qual tipo de conteúdo (content-type) que estamos enviando (no caso, enviaremos um json)

            headers: {

                "Content-Type": "application/json",

            },

            // Aqui definimos qual é o conteúdo que enviaremos para essa requisição (no caso, estamos transformando em JSON o conteúdo da empresa (que capturamos durante o cadastro))

            body: JSON.stringify(empresa)

          })

          /* Logo após temos 2 estruturas de controle da requisição: .then() e .catch()

          .then() servirá para lidarmos com a resposta da requisição

          .catch() servirá para lidarmos com possíveis erros durante a requisição

          */

         

          .then((resposta) => {

            resposta.json()

            .then((resultado) => {

                // Aqui, guardo o ID da empresa cadastrada (precisamos disso para associar ao endereço, já que no endereço existe o campo "fkEmpresa")

                var fkEmpresa = resultado.insertId;

                cadastrarEndereco(fkEmpresa);

               

                // Logo após cadastrar a empresa, devemos cadastrar o endereço

            })

            .catch((erro) => {

                console.log(erro);

            })

               

         

           

          })

          // Aqui indico que caso haja algum erro, printe-o no console.

          .catch((erro) => {

            console.log(erro)

          })

           

 

           

        } else {

            modal_mensagem_erro.style.display = 'flex';

            modal_erro.style.display = 'flex';

        }

    }

    function concluirCadastro() {

        window.location.href = './index.html'

    }

    function removerMensagem(){

        modal_mensagem_erro.style.display = 'none';

        modal_erro.style.display = 'none';

    }

    // Página de login

    function redirecionarCadastro() {

        modalLogin.style.display = 'none';

        modalCadastro.style.display = 'flex';

    }

    function redirecionarLogin() {

        modalCadastro.style.display = 'none';

        modalLogin.style.display = 'flex';

    }

 

    // Fetch's

    function cadastrarEndereco(fkEmpresa) {

        endereco.fkEmpresa = fkEmpresa;

        fetch("/enderecos/cadastrar", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify(endereco)

        })

        .then((resposta => {

            if (resposta.status == 200) {

                console.log("Endereço cadastrado com sucesso;");

                // Agora, por fim, vamos cadastrar o usuário final

                cadastrarUsuario(fkEmpresa)

 

            }

        }))

        .catch((erro) => {

            console.log(erro);

        })

 

    }

 

    function cadastrarUsuario(fkEmpresa) {

        usuario.fkEmpresa = fkEmpresa;

        fetch("/usuarios/cadastrar", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify(usuario)

        })

        .then((resposta => {

            if (resposta.status == 200) {

                console.log("Usuário cadastrado com sucesso;");

                modal_mensagem_cadastrado.style.display = 'flex';

                modal_cadastrado.style.display = 'flex';

                mensagem_cadastrado.innerHTML = `Seu cadastro foi concluído com sucesso! <br>Seja Bem vindo(a) ${valor_nome_empresa}! <br>Nós da Logistech estaremos fazendo a ativação da sua conta e comunicando através do email!`

            }  else if (resposta.status == 400) {

                resposta.text()

                .then(texto => {

                  alert(texto)

                })

              }

        }))

        .catch((erro) => {

            console.log(erro);

        })

 

    }

    function buscaCEP() {
        const cep = document.getElementById('cep').value.replace(/[^0-9]/g, ''); // Limpa o CEP
        if (cep.length !== 8) {
            alert('CEP inválido!');
            return;
        }

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado!');
                    return;
                }
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('localidade').value = data.localidade;
                document.getElementById('uf').value = data.uf;
                document.getElementById('complemento').value = data.complemento;
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
            });
    }