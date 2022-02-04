<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>SPA test</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{mix('/css/app.css')}}" type="text/css">
    <script  src="http://code.jquery.com/jquery-latest.min.js"></script>
    </head>
    <body>
      <div id="app-root"></div>
      <script type="text/javascript" src="{{mix('/js/app.js')}}"></script>
    </body>
</html>
