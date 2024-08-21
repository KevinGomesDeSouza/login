class Login {
    static mat = null;
    static pas = null;
    static logado = false;
    static matlogado = null;
    static nomelogado = null;
    static acessologado = null;
    static estilocss =  null;
    static callback_ok = null;
    static callback_naook = null;
    static config = {
        cor:null,
        img:null,
        endpoint:null,
        
    };

    //https://844f1358-4147-47fb-8cda-5d5e2e27efc8-00-3s860dsgbw3kv.kirk.replit.dev
    static login = (callback_ok,callback_naook,config=null)=>{
        if(config!= null){
            this.config = config
        };
        this.callback_ok = ()=>{callback_ok()};
        this.callback_naook = ()=>{callback_naook()};
        this.endpoint += `?matricula=${this.mat}&senha=${this.pas}`;
        this.estilocss = 
        ".fundoLogin {display: flex;justify-content: center;align-items: center;width: 100%;height: 100vh; position: absolute;top: 0px;left: 0px;background-color: rgba(0,0,0,0.75);box-sizing: border-box;}" +
        ".baseLogin {display: flex;justify-content: center;align-items: stretch;width: 50%;box-sizing: inherit;}"+
        ".elementosLogin {display: flex;justify-content: center;align-items: flex-start;width: 50%;flex-direction: column;background-color: #eee;padding: 10px;border-radius: 10px 0px 0px 10px;box-sizing: inherit;}"+
        ".logoLogin {display: flex;justify-content: center;align-items: center;width: 50%;background-color: #bbb;padding: 10px;border-radius: 0px 10px 10px 0px;box-sizing: inherit;}"+
        ".campoLogin {display: flex;justify-content: flex-start;align-items: flex-start;flex-direction: column;box-sizing: inherit;margin-bottom:10px;}"+
        ".campoLogin > label {font-size: 18px;}"+
        ".campoLogin > input {font-size: 18px;padding: 5px;background: #fff;border-radius: 5px;}"+
        ".logoLogin > img {width: 90%;}"+
        ".botoesLogin{display: flex;justify-content:space-around;align-items: center;width: 100%;box-sizing:inherit;}"+
        `.botoesLogin > button {cursor: pointer;background-color:#${this.config.cor};color: #fff;border-radius: 5px;padding: 10px 20px;box-sizing: inherit;width: 100px;}`;

        const corpo = document.body;

        const fundoLogin = document.createElement("div");
        fundoLogin.setAttribute("id","fundoLogin");
        fundoLogin.setAttribute("class","fundoLogin");
        document.body.prepend(fundoLogin);

        const baseLogin = document.createElement("div");
        baseLogin.setAttribute("id","baseLogin");
        baseLogin.setAttribute("class","baseLogin");
        fundoLogin.prepend(baseLogin);

        const elementosLogin = document.createElement("div");
        elementosLogin.setAttribute("id","elementosLogin");
        elementosLogin.setAttribute("class","elementosLogin");
        baseLogin.prepend(elementosLogin);

        const campoLogin_user = document.createElement("div");
        campoLogin_user.setAttribute("class","campoLogin");
        const label_username = document.createElement("label");
        label_username.innerHTML = "Username:";
        const f_username = document.createElement("input");
        f_username.setAttribute("type","text");
        f_username.setAttribute("name","f_username");
        f_username.setAttribute("id","f_username");
        elementosLogin.appendChild(campoLogin_user);
        campoLogin_user.appendChild(label_username);
        campoLogin_user.appendChild(f_username);

        const campoLogin_pass = document.createElement("div");
        campoLogin_pass.setAttribute("class","campoLogin");
        const label_pass = document.createElement("label");
        label_pass.innerHTML = "Senha:";
        const f_senha = document.createElement("input");
        f_senha.setAttribute("type","password");
        f_senha.setAttribute("name","f_senha");
        f_senha.setAttribute("id","f_senha");
        elementosLogin.appendChild(campoLogin_pass);
        campoLogin_pass.appendChild(label_pass);
        campoLogin_pass.appendChild(f_senha);

        const botoesLogin = document.createElement("div");
        botoesLogin.setAttribute("class", "botoesLogin");
        const btn_login = document.createElement("button");
        btn_login.setAttribute("id","btn_login");
        btn_login.innerHTML = "Login";
        btn_login.addEventListener("click",()=>{
           this.verificaLogin()
        });
        const btn_cancelar = document.createElement("button");
        btn_cancelar.setAttribute("id","btn_cancelar");
        btn_cancelar.innerHTML = "Cancelar";
        btn_cancelar.addEventListener("click", ()=>{
            this.fechar()
        });
        elementosLogin.appendChild(botoesLogin);
        botoesLogin.appendChild(btn_login);
        botoesLogin.appendChild(btn_cancelar);

        const logoLogin = document.createElement("div");
        logoLogin.setAttribute("class","logoLogin");
        const img = document.createElement("img");
        img.setAttribute("src","logo.png");
        img.setAttribute("alt","CFBCursos");
        baseLogin.appendChild(logoLogin);
        logoLogin.appendChild(img);



        const linkestilo= document.createElement("style");
        linkestilo.setAttribute("id","id_estiloLogin");
        linkestilo.setAttribute("rel","stylesheet");
        linkestilo.setAttribute("type","text/css");
        linkestilo.innerHTML = this.estilocss;
        document.head.appendChild(linkestilo);




        


        
    }
    static verificaLogin = ()=>{
        const mat = document.querySelector("#f_username").value;
        let pas = document.querySelector("#f_senha").value;

        const endpoint = `${this.config.endpoint}/?matricula=${mat}&senha=${pas}`;

        fetch(endpoint)
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{
           if(res){
                sessionStorage.setItem("logado","true");
                sessionStorage.setItem("matlogado",mat);
                sessionStorage.setItem("nomelogado",res.nome);
                sessionStorage.setItem("acessologado",res.nome);
                this.callback_ok();
                this.fechar();
           }
           else{
                sessionStorage.setItem("logado","false");
                sessionStorage.setItem("matlogado","");
                sessionStorage.setItem("nomelogado","");
                sessionStorage.setItem("acessologado","");
                this.callback_naook();
           }
        });
        
        // if(mat == "123" && pas == "321"){
        //     return true

        // }
        // else{
        //     return false
        // }
    }

    
    
    static fechar = ()=>{
       const fundoLogin = document.querySelector("#fundoLogin");
       fundoLogin.remove();
       const id_estiloLogin = document.getElementById("id_estiloLogin");
       id_estiloLogin.remove();
    }
}

// export{Login};

