To run: </br>
First install Python and pip </br>
For setup, run the following commands (powershell): </br>
1). pip install virtualenv </br>
2). python -m venv env </br>

2.5)If running scripts is not allowed on the maching run the following command (If using an ide terminal i.e vscode, run as admin then run the command): <br>
Set-ExecutionPolicy RemoteSigned <br>

3). ./env/Scripts/activate </br>
4). python -m pip install -r requirements.txt </br>
</br>
After setup you can run it this way:</br>
1). ./env/Scripts/activate</br>
2). python server.py</br>

Do leave the virtual envrionment, simply type 'deactivate' </br>


NOTE: Be sure to run in a virtual environment when running locally
