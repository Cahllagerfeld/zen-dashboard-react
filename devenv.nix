{ pkgs, ... }:

{

  # https://devenv.sh/packages/
  packages = [ pkgs.git pkgs.nodejs_18 pkgs.nodePackages_latest.pnpm ];

  languages.typescript.enable = true;
  languages.nix.enable = true;

  scripts.install-deps.exec = ''
    pnpm i
  '';
}
