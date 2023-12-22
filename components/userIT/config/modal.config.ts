export const modalConfig = {
  header: {
    newTitle: 'Add Todo',
    oldTitle: 'Edit Todo',
  },
  formItems: [
    {
      type: 'input',
      name: ['first name'],
      label: 'First Name',
    },
    {
      type: 'input',
      name: ['last name'],
      label: 'Last Name',
    },
    {
      type: 'select',
      name: 'active',
      label: 'Active',
      options: [
        {
          value: true,
          title: 'Ja',
        },
        {
          value: false,
          title: 'Nein',
        },
      ],
    },
  ],
}
