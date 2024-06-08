
document.addEventListener("DOMContentLoaded", function () {

    let todoes = []
    let isChecked = false
    let activeCount = 0



    let title = document.getElementById("todoTitle");
    let input_element = document.getElementById("add_check_list_item")
    let label_inuput = document.getElementById("input_label")
    let ul = document.getElementById("list_ul");
    let input_element_parent = document.getElementById("parent_input_check_list_item")
    let count_element = document.getElementById("fotter_p")
    let all_list = document.getElementById("all")
    let active_list = document.getElementById("active")
    let completed_list = document.getElementById("completed")
    let clear_component = document.getElementById("clear_component")

    all_list.addEventListener("click", allCheckedList);
    active_list.addEventListener("click", activeCheckedList)
    clear_component.addEventListener("click", clearCompletedList)
    completed_list.addEventListener("click", completedCheckedList);


    function clearCompletedList() {
        for (let index = ul.children.length - 1; index >= 0; index--) {
            let li = ul.children[index];
            let input = ul.children[index].querySelector("input");
            if (input.checked) {
                li.remove()
            }

        }
    }



    function completedCheckedList() {
        console.log("hello")
        for (let index = 0; index < ul.children.length; index++) {
            let li = ul.children[index];
            let input = ul.children[index].querySelector("input");
            if (!input.checked) {
                li.style.display = "none";
            } else {
                li.style.display = "block";
            }

        }
    }






    title.innerHTML = "todos"
    label_inuput.innerHTML = "&#8964;"
    count_element.innerHTML = "0 items left!"
    title.style = "color: #B83F45;text-align:center"
    label_inuput.style = "font-size:40px; color:gray; outline: none;"

    input_element.style = "margin-right:5px;font-size:20px; color:gray; outline: none;"


    label_inuput.addEventListener("click", () => {
        console.log(`checked ${isChecked}`)
        isChecked = !isChecked
        resetCounter()

        for (let index = 0; index < ul.children.length; index++) {


            console.log(ul.children[index])
            let li_input = ul.children[index].querySelector("input");
            let li_label = ul.children[index].querySelector("label");
            console.log(li_input)

            li_input.checked = isChecked
            li_label.style = isChecked ? "text-decoration: line-through; color:gray; font-size:20px" : "text-decoration: none;  font-size:20px"


        }
    })

    input_element.addEventListener("click", () => {
        console.log("hello")
        input_element_parent.style = "border: 2px solid #D08383"

        input_element.addEventListener("blur", () => {
            // input_element_parent.className = "border-none"
            input_element_parent.style = "border: none"


        })

    })


    input_element.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {

            addTotoList(input_element.value)
        }
    });



    function addTotoList(event) {

        let input = event
        if (input.length > 1) {
            todoes.push(input)
            let li = document.createElement("li")
            let label = document.createElement('label');
            var inputElemnt = document.createElement("input");

            inputElemnt.style = "margin-right: 10px; padding-top: 10px;"
            label.style = "margin-bottom:10px; font-size:20px  "
            li.style = "border-bottom: 1px  solid gray;margin-top :8px; padding-bottom: 10px;"
            // li.className= "bb-5 color-gray mt-2 pb-4 "

            inputElemnt.setAttribute("type", "checkbox");
            label.textContent = input
            li.appendChild(inputElemnt)
            li.appendChild(label)
            let button = document.createElement("button");

            // button.style.display = "none"

            button.textContent = "x"
            button.style = "float: right; margin-right:5px; color:gray; font-size:30px; display:none"



            li.addEventListener("dblclick", (event) => {
                console.log(event, event)
                li.removeEventListener("mouseenter", (_) => {
                    console.log('mouse enter')
                })
                editContent(event)


            })
            button.addEventListener("click", (event) => {
                if (!inputElemnt.checked) {
                    console.log('its uncheck')
                    countDecrementer()
                }

                event.target.parentNode.remove();
                // console.log(ul.childNodes.length, 'childNodes', ul.children.length, "children length")
            })



            inputElemnt.addEventListener("click", () => {
                if (inputElemnt.checked) {
                    console.log('its check')
                    label.style = "text-decoration: line-through; color:gray; font-size:20px"

                    countDecrementer()

                } else {
                    console.log('its uncheck')
                    label.style = "margin-bottom:10px; font-size:20px; text-decoration: none; color:black;"
                    countIncrementer()
                }
            })

            li.appendChild(button)
            // div.append(li)
            ul.appendChild(li)

            li.addEventListener("mouseenter", (event) => {

                button.style = "float: right; margin-right:5px; color:gray; font-size:30px; display:block"


            })
            li.addEventListener("mouseleave", (event) => {

                // button.classList.add('hidden')
                button.style = "float: right; margin-right:5px; color:gray; font-size:30px; display:none"


            })
            input_element.value = ""
            countIncrementer()
        }

    }



    function resetCounter() {

        console.log(ul.children.length, "ul.children.length")
        activeCount = isChecked ? 0 : ul.children.length
        console.log(activeCount)
        count_element.innerHTML = activeCount + " items left"

    }



    function countIncrementer() {
        activeCount++;
        count_element.innerHTML = activeCount + " items left"
    }

    function countDecrementer() {
        if (activeCount > 0) {
            activeCount--;
        }
        else {
            activeCount = 0;

        }
        count_element.innerHTML = activeCount + " items left"
    }

    function editContent(event) {


        console.log("edit content")
        let li = event.target.parentElement


        let label = li.querySelector('label')
        let checkbox = li.querySelector('input')
        let button = li.querySelector('button')
        checkbox.style = "display:none"
        button.classList = "display:none"

        let currentText = label.textContent

        let input = document.createElement('input')

        input.type = "text"
        input.value = currentText
        input.style = "margin-left: 15px;outline: none; width: 100%; "
        label.replaceWith(input)
        // input.className = "w-full border-none"
        input.focus()

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                label.textContent = input.value
                label.style = "margin-bottom:10px; font-size:20px;display:''; margin-left:10px; margin-right:10px"


                input.parentNode.replaceChild(label, input)

                checkbox.style = "display:''"
                button.classList = "display:''"
                // label.style = "margin-bottom:10px; font-size:20px;display:''; margin-left:10px; margin-right:10px"


            }
        })
        input.addEventListener("blur", () => {
            label.textContent = label.textContent
            input.parentNode.replaceChild(label, input)

            checkbox.style = "display:''"
            // label.style = "margin-bottom:10px; font-size:20px;display:''; margin-left:10px; margin-right:10px"
            button.classList = "display:''"



        })
    }




    function allCheckedList() {
        console.log("hello")
        for (let index = 0; index < ul.children.length; index++) {
            let li = ul.children[index]
            li.style = "border-bottom: 1px  solid gray;margin-top :8px; padding-bottom: 10px; display: ''"


        }
    }




    function activeCheckedList() {

        for (let index = 0; index < ul.children.length; index++) {
            // li.style.display = ''

            let li = ul.children[index]

            let input = ul.children[index].querySelector("input")

            if (input.checked) {
                console.log("checked")
                li.style.display = "none"
            } else {
                li.style.display = "block"
            }
        }
    }
})