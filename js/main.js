$(document).ready(function () {
    $("#todoText").focus();

    colors = ["red", "lightgreen", "yellow", "green", "cyan"];
    colorIndex = 0;
    //text from input field
    text = "";
    //show tasks if they are already exist
    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            compIcon = "far";
            if(todo.status == "complete"){
                compIcon = "fas";
            }
            $("#todoList").append(
                "<div class='task magenta " + todo.color + " " + todo.status + "' data-id='task'>" +
                "<div class='task-text'>" + todo.text + "</div >" +
                "<div class='btn'>" +
                "<button class='compTask'><i class='" + compIcon + " fa-check-circle'></i></button> " +
                "<button class='delTask'><i class=\'far fa-trash-alt\'></i></button> " +
                "</div> " +
                "</div > "
            );
            colorIndex++;
            if (colorIndex >= 5) {
                colorIndex = 0;
            }
        });
    }

    //add new task
    $("#todoForm").submit(function (e) {
        e.preventDefault();

        text = $("#todoText").val();

        $("#todoText").val("");

        if (!text || /^\s*$/.test(text)) {
            return;
        }

        const task = "<div class='task " + colors[colorIndex] + "' data-id='task'>" +
            "<div class='task-text'>" + text + "</div >" +
            "<div class='btn'>" +
            "<button class='compTask'><i class='far fa-check-circle'></i></button> " +
            "<button class='delTask'><i class='far fa-trash-alt'></i></button> " +
            "</div> " +
            "</div > ";

        $("#todoList").append(task);

        var todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        todos.push({ "text": text, "status": "", "color": colors[colorIndex] });

        //set to localstorage
        localStorage.setItem("todos", JSON.stringify(todos));

        colorIndex++;
        if (colorIndex >= 5) {
            colorIndex = 0;
        }
    });


    //complete task

    $(document).on("click", ".compTask", function (e) {
        var btnClass = "";
        if(!$(this).parent().parent().hasClass("complete")){
            btnClass = "complete";
        }
        $(".task").toggleClass("complete");
        
        if ($(this).children("i").hasClass("far")) {
            $(this).children("i").removeClass("far");
            $(this).children("i").addClass("fas");
        } else {
            $(this).children("i").removeClass("fas");
            $(this).children("i").addClass("far");
        }

        var todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const updateTask = $(this).parent().parent().children(".task-text").text().trim();

        const objectIndex = todos.map(function (x) { return x.text }).indexOf(updateTask);

        todos[objectIndex] = { "text": todos[objectIndex].text, "status": btnClass , "color": todos[objectIndex].color };

        localStorage.setItem("todos", JSON.stringify(todos));
    });

    //delete task

    $(document).on("click", ".delTask", function (e) {
        $(this).parent().parent().animate({
            height: 0
        }, 500, () => {
            $(this).parent().parent().remove();
        });

        var todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const deleteTask = $(this).parent().parent().children(".task-text").text().trim();

        const objectIndex = todos.map(function (x) { return x.text }).indexOf(deleteTask);

        todos.splice(objectIndex, 1);

        console.log(todos);

        localStorage.setItem("todos", JSON.stringify(todos));
    });
});
