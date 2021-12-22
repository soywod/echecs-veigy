{
  description = "Website for the chess club of Veigy-Foncenex.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-21.11";
    utils.url = "github:numtide/flake-utils";
    flake-compat = {
      url = "github:edolstra/flake-compat";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, utils, ... }:
    utils.lib.eachDefaultSystem
      (system:
        let
          name = (builtins.fromJSON (builtins.readFile ./package.json)).name;
          pkgs = import nixpkgs { inherit system; };
          next = "yarn run --offline --ignore-scripts --ignore-engines -- next";
        in
          rec {
            # nix build
            defaultPackage = pkgs.yarn2nix-moretea.mkYarnPackage {
              inherit name;
              src = ./.;
              extraBuildInputs = with pkgs.nodePackages; [ prettier typescript typescript-language-server ];
              configurePhase = "ln -s $node_modules node_modules";
              buildPhase = "${next} build";
              installPhase = "exit";
              distPhase = "${next} export -o $out";
            };            

            # nix develop
            devShell = pkgs.mkShell {
              inputsFrom = [ self.defaultPackage.${system} ];
            };
          }
      );
}
