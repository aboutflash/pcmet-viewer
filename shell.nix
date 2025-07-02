# shell.nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_24
    pkgs.zulu
    pkgs.kotlin
    pkgs.pnpm
  ];

  shellHook = ''
    export JAVA_HOME=${pkgs.zulu}
    export PATH=$JAVA_HOME/bin:$PATH

    if [ -f "$HOME/.env-aboutflash" ]; then
      source "$HOME/.env-aboutflash"
      echo "⚙️  Umgebungsvariablen aus ~/.env-aboutflash geladen"
    else
      echo "⚠️  Datei ~/.env-aboutflash nicht gefunden"
    fi

    echo "Willkommen in der privaten IntelliJ Shell! (Java 21, Node 24)"
    # idea-ultimate nosplash dontReopenProjects
    # exit
  '';
}
