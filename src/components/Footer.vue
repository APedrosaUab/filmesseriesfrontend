<template>
    <footer class="py-3">
      <div class="container-footer">
        <div class="row">
          <div class="col-12 col-md-6 prslLeftFooter">
            <p class="mb-0">Copyright &copy; 2024 Filmes e Séries Inc. Todos os direitos reservados.</p>
          </div>
          <div class="col-12 col-md-6 text-md-right prslRightFooter">
            <p class="mb-0">Projeto Final Programação Web Avançada. André Pedrosa.</p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'AppFooter',
  };
  </script>
  
  <style scoped>

  .container {
    min-height: unset!important;
  }
  
.container-footer {
  padding: 0 20px;
}

  .prslLeftFooter, .prslRightFooter {
    font-size: 12px;
  }
  .prslLeftFooter {
    text-align: left;
  }
  .prslRightFooter {
    text-align: right;
  }

  @media screen and (max-width: 767px) {
  .prslLeftFooter, .prslRightFooter {
    font-size: 10px;
    text-align: left;
  }
}
  </style>
  