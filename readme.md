Going to create a algorithm visualizer

requirements are in requirements.txt:
    To intall the required libraries and frameworks execute the following command to execute in local machine.
    make sure you install the python3 in your machine and edit the system variable and environment variable.
        CMD : pip freeze > requirements.txt
    can also be implement in virtual env in your machine to do that install python
    CMD to install virtual env: pip install pipenv or pip install virtualenv
    if pipenv:
        CMD: pipenv shell - to activate package pipfile
        CMD: pipenv install package - to install all the packages in pipfile
    if virtualenv:
        CMD: vitualenv env
        CMD Windows: . env/scripts/activate
        linux: . env/bin/activate
    after setup all the requiremets:
        change directory to the root folder where the manage.py is present and run the following command
        CMD: python manage.py runserver
        ctrl+click URL: http://127.0.0.1:8000/