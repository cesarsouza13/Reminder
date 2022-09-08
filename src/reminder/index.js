class Reminder{

//construtor da classe reminder que armazena lembretes em um array
    constructor(){
        this.arrayReminder = [];
        this.id = 0;
        this.condition = false;
    }


//metodos da classe Reminder

    //metodo de envio de lembrete
    SendReminder(){
        event.preventDefault();
       let reminder = this.ReadData();
       if(this.Validation(reminder)){
            this.Append(reminder);
            this.AppendReminder(reminder);

       }

       else{
        document.getElementById('name').value = ''
        document.getElementById('date').value = ''
       }
     
    }

    //metodo ler dados do input e criar o objeto lembrete
    ReadData(){
        let reminder = {};

        reminder.name = document.getElementById('name').value;
        reminder.date = document.getElementById('date').value;
        reminder.id = this.id;

 

        return reminder;
    }

    //metodo para validação do campo de data
    Validation(reminder){
        let msg = '';

        
        let date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
       
        let dayReminder = reminder.date[0] + reminder.date[1]
        let monthReminder = reminder.date[3] + reminder.date[4]
        let yearReminder = reminder.date[6] + reminder.date[7] + reminder.date[8] + reminder.date[9]  

        if(reminder.date === ''){
            msg += 'Informe a data do lembrete';
        }
        
        if(msg != ''){
            alert(msg);
            return false;
        }

        for(let i = 0; i <this.arrayReminder.length; i++){
            if(reminder.date === this.arrayReminder[i].date && reminder.name === this.arrayReminder[i].name){
                
                msg += 'Lembrete ja criado, insira um novo lembrete';
           
                alert(msg);
               

                return false;
                
            }
        }
      
        if(yearReminder < year){
            msg += 'Ano invalido, insira uma nova data';
            alert(msg);
            return false;
        }

        else if(monthReminder < month){
            msg += 'Mes invalido, insira uma nova data';
            alert(msg);
            return false;
        }

        else if(dayReminder < day){
            msg += 'dia invalido, insira uma nova data'; 
            alert(msg);
        

            return false;
        }
            
        return true;
    }

    //metodo que adiciona o lembre ao array de lembretes
    Append(reminder){
        this.arrayReminder.push(reminder);
       
        console.log(this.arrayReminder);

    }

  

    //metodo responsável por listar os lembretes
    AppendReminder(reminder){
        let bodyList = document.getElementById('body_list');
        this.condition = false;
    
            for(let i = 0; i <this.arrayReminder.length; i++){
                if(reminder.date === this.arrayReminder[i].date && reminder.name !== this.arrayReminder[i].name  && this.condition == false){
                    
                    let div = document.getElementById(reminder.date);
                   
                    let pReminder = document.createElement('p');
                    pReminder.setAttribute("id",reminder.id);
                    pReminder.innerText = reminder.name;
                    div.appendChild(pReminder);

                    let imgDelete = document.createElement('img');
                    imgDelete.src = '../imagens/excluir.png';
                    imgDelete.setAttribute("onclick", "reminder.DeleteReminder("+ reminder.id +")");
                    pReminder.appendChild(imgDelete);

                    this.condition = true;
                }
                

              
            }
                        
                if(this.condition == false){

                    let div = document.createElement('div');
                    div.setAttribute("id",reminder.date);
                    bodyList.appendChild(div);

                    let h2Date = document.createElement('h2');
                    h2Date.innerText = reminder.date;
                    div.appendChild(h2Date);

                    let pReminder = document.createElement('p');
                    pReminder.setAttribute("id",reminder.id);
                    pReminder.innerText = reminder.name;
                    div.appendChild(pReminder);

                    let imgDelete = document.createElement('img');
                    imgDelete.src = '../imagens/excluir.png';
                    imgDelete.setAttribute("onclick", "reminder.DeleteReminder("+ reminder.id +")");
                    pReminder.appendChild(imgDelete);

                }

            
        PostReminder(reminder);
        this.id++;
        document.getElementById('name').value = ''
        document.getElementById('date').value = ''

    }

    DeleteReminder(id){
        if(confirm('deseja realmente deletar o lembrete ?')){
            for(let i = 0; i <this.arrayReminder.length; i++){
                if(this.arrayReminder[i].id === id){

                    
                    let div = document.getElementById(this.arrayReminder[i].date);
                    let pReminder = document.getElementById(id);
                    div.removeChild(pReminder);

                    this.arrayReminder.splice(i, 1)
                    DeleteReminder(id);
                }
            }

        }
    }
}

let reminder = new Reminder();


//Função responsavel por consumir rota e enviar informações para cadastro no back-end
    async function PostReminder(body) {
    

        const url = 'http://localhost:3000/register'

        try {

            // Acessando a rota post da minha API com axios
            const response = await axios.post(url, body)

            console.log(response);
        

        }
        catch (error) {
            console.log(error)

        }
    }

//Função responsavel por consumir rota e deletar cadastro de acordo com o id
    async function DeleteReminder(id) {
    

        const url = 'http://localhost:3000/delete/:' + id;

        try {

            const response = await axios.delete(url)// Acessando a rota post da minha API com axios

            console.log(response)

        }
        catch (error) {
            console.log(error)

        }
    }