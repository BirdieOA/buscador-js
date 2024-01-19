// SE DECLARA EL ARRAY //
const post = [
  {
    id: 1,
    category: "noticias",
    title: "Sonata Artica lanza un nuevo single",
    status: "publicado"
  },
  {
    id: 2,
    category: "noticias",
    title: "Ramones: A 20 años del último show en Argentina",
    status: "publicado"
  },
  {
    id: 3,
    category: "noticias",
    title: "Queen regresa al país con su nueva gira mundial",
    status: "A publicar"
  },
  {
    id: 4,
    category: "coberturas",
    title: "En fotos: Conociendo Rusia en el Teatro Vorterix",
    status: "A publicar"
  },
  {
    id: 5,
    category: "coberturas",
    title: "En fotos: La Renga en el Estadio de Racing",
    status: "publicado"
  },
  {
    id: 6,
    category: "coberturas",
    title: "En fotos: Fito Paez en el Luna Park",
    status: "publicado"
  },
  {
    id: 7,
    category: "noticias",
    title: "Charly García prepara su nuevo material de estudio",
    status: "A publicar"
  }
];

console.table(post);

// SE CREA UNA CLASE DONDE SE VAN A ENGLOBAR Y TRABAJAR LOS DISTINTOS METODOS //
class Check {
  constructor(post) {
    this.post = post;
  }

  getPostById(id) {
    const foundPost = this.post.find((item) => item.id === id);
    if (foundPost) {
      return foundPost;
    } else {
      alert("No se encontraron resultados.");
    }
  }

  getPostByCategory(category) {
    return this.post.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  getPostByStatus(status) {
    return this.post.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase()
    );
  }

  getPostByTitle(title) {
    return this.post.filter((item) =>
      item.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  addPost(newPost) {
    newPost.id = this.generateUniqueId();
    this.post.push(newPost);
  }

  generateUniqueId() {
    return Math.max(...this.post.map((item) => item.id), 0) + 1;
  }

  printTable() {
    console.table(this.post);
  }
}

const news = new Check(post);
let continuar = true;

while (continuar) {
  let eleccion = prompt(
    'Escribir "agregar" para realizar una nueva publicación\nEscribir "buscar" para acceder al buscador\nEscribir "salir" para terminar'
  );
  eleccion = eleccion.toLowerCase();

  if (eleccion === "agregar") {
    let newPost;
    do {
      newPost = prompt("Ingrese la categoría del posteo");
      if (newPost.toLowerCase() !== "salir") {
        let titulo = prompt("Ingrese el título del nuevo posteo");
        let estado = prompt("Ingrese el estado del nuevo posteo");
        news.addPost({ category: newPost, title: titulo, status: estado });
        news.printTable(); // Imprimir la tabla actualizada
      }
    } while (newPost.toLowerCase() !== "salir");
  } else if (eleccion === "buscar") {
    let busqueda;
    do {
      busqueda = prompt(
        "Ingrese el ID, título, categoría o estado de la publicación que está buscando"
      );
      if (busqueda.toLowerCase() !== "salir") {
        let results = [];

        if (!isNaN(busqueda)) {
          // Si es un número, buscar por ID
          const resultById = news.getPostById(parseInt(busqueda));
          if (resultById) {
            results.push(resultById);
          }
        } else {
          // Si no es un número, buscar por título, categoría o estado
          const resultByTitle = news.getPostByTitle(busqueda);
          const resultByCategory = news.getPostByCategory(busqueda);
          const resultByStatus = news.getPostByStatus(busqueda);

          results = results.concat(
            resultByTitle,
            resultByCategory,
            resultByStatus
          );
        }

        if (results.length > 0) {
          let message = "Resultados:\n";
          results.forEach((result) => {
            message += `ID: ${result.id}\nTítulo: ${result.title}\nCategoría: ${result.category}\nEstado: ${result.status}\n\n`;
          });
          alert(message);
        } else {
          alert("No se encontraron resultados.");
        }
      }
    } while (busqueda.toLowerCase() !== "salir");
  } else if (eleccion === "salir") {
    continuar = false;
  }
}
