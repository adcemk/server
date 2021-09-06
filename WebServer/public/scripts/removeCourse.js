function removeCourse(){
    $(document).on("click", ".remove-materia",function(e){
        e.preventDefault();
        $(this).parents(".materia").remove();
        //update labels
        $("#form1").find("label[for^='materia']").each(function(){
            $(this).html("materia " + ($(this).parents('.materia').index() + 1));
        });
    });
}