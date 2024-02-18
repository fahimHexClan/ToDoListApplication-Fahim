window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const due_date_input = document.querySelector("#new-task-due-date");
    const category_select = document.querySelector("#new-task-category");
    const status_select = document.querySelector("#Status");

    let currentTaskEl = null;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        const task_due_date = due_date_input.value;
        const task_category = category_select.value;
        const task_status = status_select.value;

        if (currentTaskEl) {
            // Update existing task
            const task_content_el = currentTaskEl.querySelector('.content');
            const task_due_date_el = task_content_el.querySelector('.due-date');
            const task_category_el = task_content_el.querySelector('.category');
            const task_status_el = task_content_el.querySelector('.status');
            const task_input_el = task_content_el.querySelector('.text');

            task_due_date_el.innerText = task_due_date;
            task_category_el.innerText = task_category;
            task_status_el.innerText = task_status;
            task_input_el.value = task;

            currentTaskEl = null;
        } else {
            // Create new task
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

            const task_status_el = document.createElement('div');
            task_status_el.classList.add('status');
            task_status_el.innerText = task_status;

            task_content_el.appendChild(task_due_date_el);
            task_content_el.appendChild(task_category_el);
            task_content_el.appendChild(task_status_el);

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
        }

        input.value = '';
        due_date_input.value = ''; // Clear the due date field
        category_select.value = ''; // Clear the category field
        status_select.value = ''; // Clear the status field
    });

    list_el.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('edit')) {
            const task_el = target.closest('.task');
            if (task_el) {
                const task_content_el = task_el.querySelector('.content');
                const task_due_date_el = task_content_el.querySelector('.due-date');
                const task_category_el = task_content_el.querySelector('.category');
                const task_status_el = task_content_el.querySelector('.status');
                const task_input_el = task_content_el.querySelector('.text');

                input.value = task_input_el.value;
                due_date_input.value = task_due_date_el.innerText;
                category_select.value = task_category_el.innerText;
                status_select.value = task_status_el.innerText.toLowerCase() === 'complete' ? 'complete' : 'incomplete';

                currentTaskEl = task_el;
            }
        } else if (target.classList.contains('delete')) {
            const task_el = target.closest('.task');
            if (task_el) {
                task_el.remove();
            }
        }
    });
});
