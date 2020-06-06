# Angular Fundamentals

## Instalowanie zależności

```shell
npm install
```

## Serwowanie aplikacji

```shell
npm start
```

lub

```shell
ng serve
```

## Generowanie kodu

### Komponent (_Component_)

```shell
ng generate component home

ng generate comopnent about
```

###  Moduł z routingiem (_Module_)

```shell
ng generate module colors --routing --route colors --module app
```

### Serwis (_Service_)

```shell
cd src/app/colors

ng generate service colors
```

### Dyrektywa (_Directive_)

```shell
cd src/app/colors

ng generate colorHighlight
```

### Potok (_Pipe_)

```shell
cd src/app/colors

ng generate pipe DisplayColor
```


## Git

```
git clean -df

git checkout
```
