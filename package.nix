# Inspired by pkgs/applications/editors/uivonim/default.nix
# and pkgs/by-name/in/indiepass-desktop/package.nix
{ lib, buildNpmPackage, fetchFromGitHub, electron }:

buildNpmPackage rec {
  pname = "pcmet-viewer";
  version = "0.1";

  src = ./.;

  npmDepsHash = "sha256-rVuo+N8lNJqxWSPI7NRhQkLkQG/gqyBJsAvbOooc1Fk="; # you will get an error about mismatching hash the first time. Just copy the hash here

  # Useful for debugging, just run "nix-shell" and then "electron ."
  nativeBuildInputs = [
    electron
  ];

  # Otherwise it will try to run a build phase (via npm build) that we don't have or need, with an error:
  # Missing script: "build"
  # This method is used in pkgs/by-name/in/indiepass-desktop/package.nix
  dontNpmBuild = true;

  # Needed, otherwise you will get an error:
  # RequestError: getaddrinfo EAI_AGAIN github.com
  env = {
    ELECTRON_SKIP_BINARY_DOWNLOAD = 1;
  };

  # The node_modules/XXX is such that XXX is the "name" in package.json
  # The path might differ, for instance in electron-forge you need build/main/main.js
  postInstall = ''
    makeWrapper ${electron}/bin/electron $out/bin/${pname} \
      --add-flags $out/lib/node_modules/${pname}/main.js
  '';

}
