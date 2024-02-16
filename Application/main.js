window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const due_date_input = document.querySelector("#new-task-due-date");
    const category_select = document.querySelector("#new-task-category");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        const task_due_date = due_date_input.value;
        const task_category = category_select.value;

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        const task_due_date_el = document.createElement('div');
        task_due_date_el.classList.add('due-date');
        task_due_date_el.innerText = task_due_date;

        const task_category_el = document.createElement('div');
        task_category_el.classList.add('category');
        task_category_el.innerText = task_category;

        task_content_el.appendChild(task_due_date_el);
        task_content_el.appendChild(task_category_el);

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = '';
        due_date_input.value = ''; // Clear the due date field
        category_select.value = ''; // Clear the category field

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_due_date_el.contentEditable = true;
                task_category_el.contentEditable = true;
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                task_due_date_el.contentEditable = false;
                task_category_el.contentEditable = false;
            }
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
        });
    });
});
