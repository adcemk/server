function addCourse(){
    $(document).ready(function(){
        $("#add").click(function(e){
            e.preventDefault();
            var numberOfmaterias = $("#form1").find("input[name^='materia']").length;
            var label = '<label for="[materia][' + numberOfmaterias + ']">materia ' + (numberOfmaterias + 1) + '</label> ';
            var input = '<input type="text" name="materia[' + numberOfmaterias + ']" id="materia[' + numberOfmaterias + ']" />';
            var removeButton = '<button class="remove-materia" onclick="removeCourse()">Remove</button>';
            var html = "<div class='materia'>" + label + input + removeButton + "</div>";
            $("#form1").find("#add").before(html);
        });
    });
}