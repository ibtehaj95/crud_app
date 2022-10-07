let global_variables = {
    li_count: 0
}

localstorage_rmvall("li");

let add_button = document.querySelector("#add_button_id");
// console.log(add_button);
let chapter_list = document.querySelector("#chapter_list_id");
// console.log(chapter_list);
add_button.addEventListener("click", add_chapter);

function add_chapter(event){
    // console.log(event);
    let input_value = document.querySelector("#input_field_id");
    // console.log(input_value);
    const new_list_item = document.createElement("li");
    new_list_item.classList.add("list-group-item");
    new_list_item.classList.add("d-flex");
    new_list_item.classList.add("justify-content-between");
    const li_heading = document.createElement("h6");
    li_heading.textContent = input_value.value;
    li_heading.classList.add("d-flex");
    li_heading.classList.add("align-items-center");
    li_heading.classList.add("flex-grow-1");
    li_heading.setAttribute("style", "margin: 0%;");
    new_list_item.appendChild(li_heading);
    const edit_btn = document.createElement("button");
    edit_btn.textContent = "Edit";
    edit_btn.classList.add("btn");
    edit_btn.classList.add("btn-warning");
    edit_btn.classList.add("mx-1");
    edit_btn.setAttribute("type", "button");
    new_list_item.appendChild(edit_btn);
    const del_btn = document.createElement("button");
    del_btn.textContent = "Remove";
    del_btn.classList.add("btn");
    del_btn.classList.add("btn-danger");
    del_btn.classList.add("mx-1");
    del_btn.setAttribute("type", "button");
    new_list_item.appendChild(del_btn);
    // console.log(new_list_item);
    chapter_list.appendChild(new_list_item);
    // console.log(chapter_list.children.length);
    // list_length = chapter_list.children.length;
    // li_count++;
    global_variables.li_count++;
    new_list_item.setAttribute("id", `li-${global_variables.li_count}`);
    edit_btn.setAttribute("id", `eb-${global_variables.li_count}`);
    del_btn.setAttribute("id", `db-${global_variables.li_count}`);
    li_heading.setAttribute("id", `hd-${global_variables.li_count}`);
    localstorage_add("li", `li-${global_variables.li_count}`, input_value.value);
    // new_list_item.addEventListener("click", highlight_li);
    edit_btn.addEventListener("click", edit_header);
    del_btn.addEventListener("click", delete_chapter);
    // console.log(chapter_list.children);
    update_empty_img(event);
    input_value.value = "";
    // console.log(input_value.value);
}

function delete_chapter(event){
    // console.log(event.path);
    const li_id = event.path[1].id;
    const li_element = document.getElementById(li_id);
    localstorage_rmv("li", li_id);
    // console.log(li_element);
    li_element.remove();
    update_empty_img(event);
}

function edit_header(event){
    // console.log(event);
    const li_id = event.path[1].id;
    const li_element = document.getElementById(li_id);
    // console.log(li_element.id);
    // console.log(typeof(li_element.id));
    // console.log(li_element.id.length);
    const element_number = li_element.id[li_element.id.length-1];
    const button_id = event.path[0].id;
    // console.log(button_id);
    const button_element = document.getElementById(button_id);
    const header_element = button_element.previousElementSibling;
    const input_box = document.createElement("input");
    input_box.type = "text";
    input_box.placeholder = "Enter Title";
    input_box.class = "form-control";
    input_box.classList.add("mx-2");
    input_box.value = header_element.textContent;
    input_box.classList.add("flex-grow-1");
    input_box.setAttribute("id", `input-${element_number}`);
    li_element.replaceChild(input_box, header_element);
    // console.log(li_element.children);
    const update_btn = document.createElement("button");
    update_btn.textContent = "Update";
    update_btn.classList.add("btn");
    update_btn.classList.add("btn-success");
    update_btn.classList.add("mx-1");
    update_btn.setAttribute("type", "button");
    update_btn.setAttribute("id", `ub-${element_number}`);
    li_element.replaceChild(update_btn, button_element);
    update_btn.addEventListener("click", confirm_name_change);
}

function confirm_name_change(event){
    // console.log(event);
    const li_id = event.path[1].id;
    const li_element = document.getElementById(li_id);
    const element_number = li_element.id[li_element.id.length-1];
    const update_btn_id = event.path[0].id;
    const update_btn_element = document.getElementById(update_btn_id);
    const input_box_element = update_btn_element.previousElementSibling;
    updated_val = input_box_element.value;
    // console.log(updated_val);
    const li_heading = document.createElement("h6");
    li_heading.textContent = updated_val;
    li_heading.classList.add("d-flex");
    li_heading.classList.add("align-items-center");
    li_heading.classList.add("flex-grow-1");
    li_heading.setAttribute("style", "margin: 0%;");
    li_heading.setAttribute("id", `hd-${element_number}`);
    li_element.replaceChild(li_heading, input_box_element);

    const edit_btn = document.createElement("button");
    edit_btn.textContent = "Edit";
    edit_btn.classList.add("btn");
    edit_btn.classList.add("btn-warning");
    edit_btn.classList.add("mx-1");
    edit_btn.setAttribute("type", "button");
    li_element.replaceChild(edit_btn, update_btn_element);
    edit_btn.setAttribute("id", `eb-${element_number}`);
    edit_btn.addEventListener("click", edit_header);

    localstorage_edit("li", li_id, updated_val);
}

function clear_all(event){
    // console.log(event.path[1]);
    // console.log(chapter_list.children);
    all_items = chapter_list.children;
    // console.log(typeof(all_items));
    allitems_arry = Array.from(all_items)
    // console.log(allitems_arry);
    for(let i=0; i<allitems_arry.length; ++i){
        // console.log(allitems_arry[i]);
        allitems_arry[i].remove();
    }

    localstorage_rmvall("li");
    
    //remove clear all
    rmvall_btn_element = document.getElementById("clr-btn-id");
    rmvall_btn_element.remove();

    //add empty image
    image_div = empty_image();
    let main = document.getElementById("main_id");
    main.appendChild(image_div);
}

function empty_image(){
    let image_div = document.createElement("div");
    image_div.setAttribute("id","empty");
    image_div.setAttribute("style","display: flex; justify-content: center;");
    let image_element = document.createElement("img");
    image_element.setAttribute("src", "./assets/empty-list");
    image_element.setAttribute("alt", "empty-list-img");
    image_div.appendChild(image_element);
    return image_div;
}

function update_empty_img(event){   //also used for the "Remove All" button additon
    // console.log(event.path);
    event_id = event.path[0].id;
    let chapter_list = document.querySelector("#chapter_list_id");
    // console.log(chapter_list.children.length);
    if(event_id.includes("add") == true){
        // console.log("Sender was Add Button");
        if (chapter_list.children.length == 1)
        {
            // console.log("Remove Image Now");
            image_element = document.getElementById("empty");
            // console.log(image_element);
            image_element.remove();
        }

        else if (chapter_list.children.length == 2)
        {
            // console.log("Add Remove All");
            const rmvall_btn = document.createElement("button");
            rmvall_btn.textContent = "Clear All";
            rmvall_btn.classList.add("btn");
            rmvall_btn.classList.add("btn-danger");
            rmvall_btn.classList.add("mx-1");
            rmvall_btn.setAttribute("type", "button");
            rmvall_btn.addEventListener("click", clear_all);
            const rmvall_btn_div = document.createElement("div");
            rmvall_btn_div.classList.add("clr-btn-cont");
            rmvall_btn_div.setAttribute("id", "clr-btn-id");
            rmvall_btn_div.setAttribute("style", "display: flex; justify-content: center;");
            rmvall_btn_div.appendChild(rmvall_btn);
            let main = document.getElementById("main_id");
            main.appendChild(rmvall_btn_div);
        }
        
        else
        {
            ;   //image already removed when item 2 and above added. Clear All Button added at item 2
        }
    }
    else if(event_id.includes("db-") == true){  //also used for the "Remove All" button deletion
        // console.log("Sender was Delete Button");
        if (chapter_list.children.length == 0)
        {
            image_div = empty_image();
            let main = document.getElementById("main_id");
            main.appendChild(image_div);
        }

        else if (chapter_list.children.length == 1)
        {
            // console.log("Remove Remove All Button");
            rmvall_btn_element = document.getElementById("clr-btn-id");
            rmvall_btn_element.remove();
        }

        else
        {
            ;   //image not needed when items are present. Clear All button already added.
        }
    }
    else{
        console.log("Couldn't figure out the source of function call");
    }
}

function localstorage_add(type, id, data){
    // localStorage.getItem();
    const new_list_item = {id, data};
    let list = localstorage_get(type);
    // console.log(list);
    list.push(new_list_item);
    localStorage.setItem(type,JSON.stringify(list));
}

function localstorage_get(type){
    if(localStorage.getItem(type)){
        return JSON.parse(localStorage.getItem(type));
    }
    else{
        return [];
    }
}

function localstorage_rmv(data_type, li_id){
    let list = localstorage_get(data_type);
    // console.log(list);
    new_list = list.filter(function (item){
        if (item.id!=li_id){
            return li_id;
        }
    });
    // console.log(new_list);
    localStorage.setItem(data_type,JSON.stringify(new_list));
}

function localstorage_rmvall(key){
    localStorage.removeItem(key);
}

function localstorage_edit(datatype, id, value){
    localstorage_rmv(datatype, id);
    localstorage_add(datatype, id, value);
}

// Highlight function is obv very buggy, since clicking in the wrong place will throw exceptions. Might still work

function highlight_li(event){
    // console.log(event);  //see event
    // console.log(event.path[1].id);  //see li id
    let hl_list = event.path[2].id; //see ul id
    // console.log(hl_list);   //see ulist to highlight
    let hl_children = document.getElementById(hl_list).children;    //select the ulist
    // console.log(hl_children);   //see ulist children, meaning li tags
    for (item of hl_children){
        item.classList.remove("active");    //remove active from other lis by going through each li tag
    }
    let hl_id = event.path[1].id;   //save li id in let
    // console.log(hl_id); //print id
    let query_hl = `#chapter_list_id #${hl_id}`;    //form the query to select li using id
    selected = document.querySelector(query_hl);    //select the li using its id
    selected.classList.add("active");   //add active to class of li
    selected.setAttribute("aria-current", "true");   //set li attribute
}