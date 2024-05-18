# ChatBox

ChatBox is an experimental chat application built with Django and Python. This project is designed to demonstrate the implementation of real-time communication features using Django Channels.
(CHECK REQUIREMENTS.TXT FOR REQUIRED LIBRARIES)

## Features

- User authentication (login/logout)
- Real-time messaging using WebSocket
- Creating and managing chat rooms
- User-friendly interface with dynamic updates

## Login page
<img width=300 src="assets/login.jpg" alt="alternative icon">

## Home page
<img width=300 src="assets/home.jpg" alt="alternative icon"> 

## Room page
<img width=300 src="assets/room.jpg" alt="alternative icon">

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ChatBox.git
    cd ChatBox
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows, use `env\Scripts\activate`
    ```

3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Apply the migrations:
    ```bash
    python manage.py migrate
    ```

5. Create a superuser to access the admin panel:
    ```bash
    python manage.py createsuperuser
    ```

6. Run the development server:
    ```bash
    python manage.py runserver
    ```

### Usage

1. Open your web browser and go to `http://127.0.0.1:8000`.
2. Log in using the superuser credentials you created.
3. Create chat rooms and start messaging in real-time.

## Deployment

To deploy this application, you can use services like Heroku, AWS, or any other platform that supports Django applications. Make sure to configure your ASGI settings and environment variables properly for deployment.
( NEED TO ADD REDIS )

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Django](https://www.djangoproject.com/)
- [Django Channels](https://channels.readthedocs.io/en/stable/)
