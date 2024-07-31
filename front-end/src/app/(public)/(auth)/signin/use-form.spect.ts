import '@testing-library/jest-dom'

describe('AuthForm', () => {
  it('should render correctly', () => {
    /* const { getByText } = render(<AuthForm />);
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Senha')).toBeInTheDocument();
    expect(getByText('Entrar')).toBeInTheDocument(); */
  })

  it('should validate email and password', () => {
    /* const { getByText, getByLabelText } = render(<AuthForm />);

    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalido' } });
    fireEvent.change(getByLabelText('Senha'), { target: { value: '123456' } });

    fireEvent.submit(getByText('Entrar')); */
    // Exibir mensagem de erro para email inválido
    // ...
    // fireEvent.change(getByLabelText('Email'), { target: { value: 'valido@email.com' } });
    // fireEvent.submit(getByText('Entrar'));
    // Exibir mensagem de erro para senha inválida
    // ...
  })

  it('should call handleSubmit on submit', () => {
    const handleSubmit = jest.fn()
    // const { getByText } = render(<AuthForm handleSubmit={handleSubmit} />);

    // fireEvent.submit(getByText('Entrar'));

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
