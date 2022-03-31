$(() => {

    loadPeople();

    function loadPeople() {
        
        $.get('/people/getall', function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(person => {
              
                $("#people-table tbody").append(`
<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td><button data-id=${person.id} data-first-name=${person.firstName} data-last-name=${person.lastName} data-age=${person.age} "
        class="btn btn-success edit-person">
       Edit
       </button>
    
    <button data-Id=${person.id} "
            class="btn btn-danger delete-person">
           Delete
         </button>
     </td>
</tr>`);
            });
        });
    }

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();


        $.post('/people/addperson', { firstName, lastName, age }, function (person) {
            
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        });
    });
    
    $("#people-table").on('click',".delete-person", function () {
       
        const id = $(this).data('id');


        $.post('/people/DeletePerson', { id }, function () {
           
            loadPeople();
            });
    });
    $("#people-table").on('click', ".edit-person",function () {
        const id = $(this).data('id');
        const firstName = $(this).data('first-name');
        const lastName = $(this).data('last-name');
        const age = $(this).data('age');

        console.log(firstName);

        $("#edit_first_name").val(firstName);
        $("#edit_last_name").val(lastName);
        $("#edit_age").val(age);
        $("#edit_id").val(id);
        $("#name").text(`${firstName} ${lastName}`);

       
        $(".edit-modal").modal();
    });

    $("#save-button").on('click', function () {

        const firstName = $("#edit_first_name").val();
        const lastName = $("#edit_last_name").val();
        const age = $("#edit_age").val();
        const id = $("#edit_id").val();
        $.post('/people/EditPerson', { firstName, lastName, age, id }, function () {

            loadPeople();
        });
        $('.edit-modal').modal('hide');
    });

})