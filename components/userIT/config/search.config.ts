export const searchConfig = {
  formItems: [
    {
      type: 'input',
      name: 'id',
      label: 'Suchen nach ID',
    },
    {
      type: 'input',
      name: ['first name'],
      label: 'Suchen nach First Name',
    },
    {
      type: 'input',
      name: ['last name'],
      label: 'Suchen nach Last Name',
    },
    {
      type: 'select',
      name: 'active',
      label: 'Suchen nach Active',
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
