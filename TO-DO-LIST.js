/*Autor: Petosa Ayala Franco */
const task_list=[
    {
        tittle:"Mejorar CV",
        description:"Aplicar en el cv todo lo aprendido",
        date:"10/09/2022",
        state:"completed",
        id:1
    },
    {
        tittle:"Aprender JS",
        description:"Seguir practicando",
        date:"02/04/2022",
        state:"completed",
        id:2
    },
    {
        tittle:"Entrenar",
        description:"Correr 20 KM",
        date:"20/02/2022",
        state:"incompleted",
        id:3
    },
    {
        tittle:"Comprar medias",
        description:"Ir al local y comprar",
        date:"11/02/2022",
        state:"incompleted",
        id:4
    },
    {
        tittle:"Trabajar el lunes",
        description:"Conectarme a las 9am",
        date:"20/02/2022",
        state:"productive",
        id:5
    },
    {
        tittle:"Revisar código",
        description:"Agregar los bugs",
        date:"11/02/2022",
        state:"productive",
        id:6
    },
    {
        tittle:"Estudiar",
        description:"Hacer las guias y leer capitulo 10 de python",
        date:"20/02/2022",
        state:"tested",
        id:7
    },
    {
        tittle:"Pasear al perro",
        description:"2 vueltas minimo",
        date:"11/02/2022",
        state:"completed",
        id:8
    },
    {
        tittle:"Ordenar la pieza",
        description:"Hacer la cama",
        date:"11/02/2022",
        state:"tested",
        id:9
    },
    {
        tittle:"Ir al banco",
        description:"Cobrar sueldo",
        date:"11/02/2022",
        state:"productive",
        id:10
    },
    {
        tittle:"Ver la serie",
        description:"Quedan 2 capitulos",
        date:"11/02/2022",
        state:"tested",
        id:11
    },
    {
        tittle:"Terminar la serie",
        description:"Quedan 2 capitulos",
        date:"11/02/2022",
        state:"tested",
        id:12
    },
    {
        tittle:"Comprar ropa",
        description:"Un patanlon nuevo",
        date:"11/02/2022",
        state:"tested",
        id:13
    },
    {
        tittle:"Anotarme en la facu",
        description:"Mandar mail al departamento de alumnos",
        date:"11/02/2022",
        state:"tested",
        id:14
    },
    {
        tittle:"Cocinar",
        description:"2 huevos",
        date:"11/02/2022",
        state:"urgent",
        id:15
    },
    {
        tittle:"Curso de php",
        description:"Aprender php para mejorar en el laburo",
        date:"11/02/2022",
        state:"urgent",
        id:16
    },
    {
        tittle:"Algoritmos",
        description:"Aprender logicas con C++",
        date:"11/02/2022",
        state:"urgent",
        id:17
    },
    {
        tittle:"Terminar la to-do-list",
        description:"Subirla a Linkedin cuando este terminada",
        date:"11/02/2022",
        state:"urgent",
        id:18
    }
]

let last_id=task_list.length

const completed_box=document.querySelector(".completed_box")
const incompleted_box=document.querySelector(".incompleted_box")
const productive_box=document.querySelector(".productive_box")
const tested_box=document.querySelector(".tested_box")
const urgent_box=document.querySelector(".urgent_box")
const btn_add=document.querySelector(".btn_add")
const modal=document.querySelector(".modal")
const btn_modal_close=document.querySelector(".btn_modal_close")
const btn_accept=document.querySelector(".btn_accept")
const tittle_input=document.querySelector(".tittle_input")
const description_input=document.querySelector(".description_input")
const state_input=document.querySelector(".state_input")
const container_cards=document.querySelectorAll(".container_cards")
const card_box=document.querySelectorAll(".card_box")
const container=document.querySelector(".container")
const search=document.querySelector(".search")

search.addEventListener("input",(e)=>{
    const filter_value=e.target.value.toLowerCase()
    task_list.forEach(task=>{
        const is_matching= task.tittle.toLocaleLowerCase().includes(filter_value)
        const card=document.getElementById(task.id)
        card.classList.toggle("hide",!is_matching)
    })
    card_box.forEach(box=>{
        //const child_left_list=check_children_number(box) //ARRAY LIST DE LOS CHILD ELEMENTS QUE TIENEN LA CLASS HIDE
        const message=box.querySelector("h3")
        const box_cards=box.querySelectorAll(".card")
        const all_cards_invisible=check_every_children(box_cards) //BOOLEAN TRUE/FALSE SI TODOS LOS CARD-ELEMENTS TIENEN LA CLASS HIDE
        message.classList.toggle("hide",!all_cards_invisible)
    })
})

function check_every_children(box_cards){
    const child_list=box_cards
    return [...child_list].every(child=>child.classList.contains("hide")) 
}

container_cards.forEach(container=>{
    container.addEventListener("dragover",(e)=>{//TIENE QUE ESTAR DEFINIDO ESTE LISTENER PARA QUE EL LISTENER DE DROP FUNCIONE
        // PREVENT DEFAULT TO ALLOW DROP
        e.preventDefault();
    },false)
    container.addEventListener("drop",(e)=>{
        const id=e.dataTransfer.getData("id")
        const card=document.getElementById(id)
        const task=task_list.find(element=>element.id==id)
        const validates_drag_zones=["completed","incompleted","productive","tested","urgent"]
        const drag_zone=e.target.id
        is_validate_zone=validates_drag_zones.some(zone=>zone==drag_zone)
        if(task.state!=drag_zone && is_validate_zone){
            e.target.style.backgroundColor="crimson"
            move_card(card,task,drag_zone,colum_state)
        }
    },false)
    container.addEventListener("dragenter",(e)=>{
        if(e.target.classList.contains("card_box")){
            e.target.style.backgroundColor="rgb(182, 6, 41)"
        }
    })
    container.addEventListener("dragleave",(e)=>{
        if(e.target.classList.contains("card_box")){
            e.target.style.backgroundColor="crimson"
        }
    })
})

btn_add.addEventListener("click",()=>{
    modal.classList.remove("hide")
})
btn_modal_close.addEventListener("click",()=>{
    modal.classList.add("hide")
})
btn_accept.addEventListener("click",()=>{
    const tittle_and_description_checked=validation()
    if(tittle_and_description_checked){
        modal.classList.add("hide")
        add_task(colum_state)
    }
})

function validation(){
    const tittle_aproved= tittle_input.value.length>0?true:false
    const description_aproved= description_input.value.length>0?true:false
    if(tittle_aproved&&description_aproved){
        return true
    }else {
        warning_message(tittle_input,description_input)
        return false
    }
}

function warning_message(input_1,input_2){
    const tool_tip=document.createElement("p")
    tool_tip.setAttribute("class","tool_tip")
    if(input_1.value.length==0&&input_2.value.length==0){
        tool_tip.innerText=`Ambos campos son obligatorios`
    }else{
        tool_tip.innerText=input_1.value.length>0?`La descripción es campo obligatorio`:`El titulo es campo obligatorio`
    }
    modal.appendChild(tool_tip)
    btn_accept.classList.add("no_events")
    setTimeout(()=>{
        modal.removeChild(tool_tip)
        btn_accept.classList.remove("no_events")
    },4000)
}

function render_cards(call_back) {
    task_list.forEach(task=>{
        const card=create_card(task)
        const state=task.state
        switch (state) {
            case "completed":
                completed_box.appendChild(card)
            break;
            case "incompleted":
                incompleted_box.appendChild(card)
            break;
            case "productive":
                productive_box.appendChild(card)
            break;
            case "tested":
                tested_box.appendChild(card)
            break;
            case "urgent":
                urgent_box.appendChild(card)
            break;
            default:
                //SERIA UN UNICO CASO FALSE
            break;
        }
    })
    call_back()
}

function create_card(task){
    const card=document.createElement("div")
    card.setAttribute("class","card")
    card.setAttribute("id",task.id)
    card.setAttribute("draggable","true")
    card.innerHTML=`
        <h5 class="card_tittle">${task.tittle}</h5>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="btn_delete_card bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
        <select class="input_move">
            <option value="undefined">Move card</option>
            <option value="completed">Completed</option>
            <option value="incompleted">Incompleted</option>
            <option value="productive">Productive</option>
            <option value="tested">Tested</option>
            <option value="urgent">Urgent</option>
        </select>
    `
    const btn_delete_card=card.querySelector(".btn_delete_card")
    btn_delete_card.addEventListener("click",()=>{
        card.classList.add("vanished")
        setTimeout(()=>{
            delete_card(card,task,colum_state)
        },450)
    })
    const input_move=card.querySelector(".input_move")
    input_move.addEventListener("input",()=>{
        let new_sate=input_move.value
        if(new_sate!=task.state && new_sate!="undefined"){
            move_card(card,task,new_sate,colum_state)
        }
    })
    const card_tittle=card.querySelector(".card_tittle")
    card_tittle.addEventListener("click",()=>{
        let new_sate=input_move.value
        open_card(task,card,new_sate)
    })
    card.addEventListener("dragstart",(e)=>{
        e.dataTransfer.setData("id", task.id);
        setTimeout(()=>{
            e.target.classList.add("invisible")
        },1)
    })
    card.addEventListener("dragend",(e)=>{
      e.target.classList.remove("invisible")
      e.target.classList.remove("inclinate")
    })
    card.addEventListener("mouseenter",(e)=>{
        e.target.classList.add("little_jump_up")
    })
    card.addEventListener("mouseleave",(e)=>{
        setTimeout(()=>{
            e.target.classList.remove("little_jump_up")
        },250)
    })
    return card
}

function add_task(call_back) {
    let new_task= new Object
    const current_date=new Date()
    new_task={
        tittle: tittle_input.value,
        description:description_input.value,
        date:`${current_date.getDate()}/${current_date.getMonth()+1}/${current_date.getFullYear()}`,
        state:state_input.value,
        id:last_id+1
    }
    last_id=last_id+1
    task_list.push(new_task)
    const new_card=create_card(new_task)
    switch (new_task.state) {
        case "completed":
            completed_box.appendChild(new_card)
        break;
        case "incompleted":
            incompleted_box.appendChild(new_card)
        break;
        case "productive":
            productive_box.appendChild(new_card)
        break;
        case "tested":
            tested_box.appendChild(new_card)
        break;
        default:
            //SERIA UN UNICO CASO FALSE
            break;
    }
    call_back()
}

function move_card(card,task,new_state,call_back){
    task.state=new_state
    const card_moved=card
    switch (new_state){
        case "completed":
            completed_box.appendChild(card_moved)
        break;
        case "incompleted":
            incompleted_box.appendChild(card_moved)
        break;
        case "productive":
            productive_box.appendChild(card_moved)
        break;
        case "tested":
            tested_box.appendChild(card_moved)
        break;
        case "urgent":
            urgent_box.appendChild(card_moved)
        break;
        default:
            //SERIA UN UNICO CASO FALSE
            break;
    }
    call_back()
}

function open_card(task){
    const modal_open_card=document.createElement("div")
    modal_open_card.setAttribute("class","modal")
    const card_opened=document.createElement("div")
    card_opened.setAttribute("class","card_opened")
    card_opened.innerHTML=`
        <div class="modal_header">
            <h2 class="tittle_open_card">${task.tittle}</h2>
            <button class="btn_close_opened_card">X</button>
        </div>
        <div class="container_description">
            <p class="description_text">${task.description}</p>
        </div>
        <button class="btn_edit">
            Edit
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
        </button>
        <button class="btn_accept_edit hide">
            Save
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"/>
                <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
            </svg>
        </button>
    `
    container.appendChild(modal_open_card)
    modal_open_card.appendChild(card_opened)
    const btn_close_opened_card=document.querySelector(".btn_close_opened_card")
    btn_close_opened_card.addEventListener("click",()=>{
        modal_open_card.classList.add("hide")
        container.removeChild(modal_open_card)
    })
    const description_text=document.querySelector(".description_text")
    const container_description=document.querySelector(".container_description")
    const btn_edit=document.querySelector(".btn_edit")
    btn_edit.addEventListener("click",()=>{
        container_description.style.boxShadow="0px 0px 5px 2px"
        description_text.setAttribute("contenteditable","true")
        description_text.focus()
        add_selection(description_text)
        btn_edit.classList.add("hide")
        btn_accept_edit.classList.remove("hide")
    })
    const btn_accept_edit=document.querySelector(".btn_accept_edit")
    btn_accept_edit.addEventListener("click",()=>{
        container_description.style.boxShadow="none"
        btn_edit.classList.remove("hide")
        btn_accept_edit.classList.add("hide")
        description_text.setAttribute("contenteditable","false")
        let text=description_text.textContent
        edit_card(task,text)
    })
}

function delete_card(card,task,call_back) {
    const task_container=card.parentNode
    task_container.removeChild(card)
    const task_to_delete=task_list.find(element=>{
        return element.id===task.id
    })
    const task_index=task_list.indexOf(task_to_delete)
    task_list.splice(task_index,1)
    call_back()
}

function colum_state(){
    container_cards.forEach((container,i)=>{
        const container_resumen=container.querySelector(".container_resumen")
        const box=container.querySelector(".card_box")
        const child_list=box.children
        const tasks=[...child_list].filter(child=>child.classList.contains("card"))
        const number_of_tasks=tasks.length
        container_resumen.innerHTML=`<p>Current number: ${number_of_tasks}</p>`
    })
    tittle_input.value=""
    description_input.value=""
}

function edit_card(task,description_edited){
    task.description=description_edited
}

function add_selection(p){
    const range= new Range()
    const start=0
    const end=p.textContent.length
    range.setStart(p.firstChild,start)
    range.setEnd(p.firstChild,end)
    
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(range)
}

render_cards(colum_state) //CUANDO SE TERMINA DE EJECUTAR RENDER_CARDS RECIEN ENTONCES EJECUTA LA FUNCIÓN PASADA COMO CALLBACK COLUMN_STATE












































































































































console.log("Author: Petosa Ayala Franco")