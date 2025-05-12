{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # Define environment variables
  shellHook = ''
    export NEXT_ENV=development
  '';

  buildInputs = [
    pkgs.nodejs
    pkgs.git
    pkgs.curl
  ];
  nativeBuildInputs = [ pkgs.gcc pkgs.make ];
}
