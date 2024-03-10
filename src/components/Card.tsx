import Select from "react-select";
import type { Props } from "react-select";
import { fakerES_MX as faker } from '@faker-js/faker';
import React from "react";

const categorias = [
  'Lúdicas',
  'Deportivas',
  'Culturales',
  'Artísticas',
  'Niños',
  'Niñas',
  '< 5 años',
  '> 5 años',
  'Adolescentes',
  'Pintura',
  'Música',
  'Teatro',
  'Danza',
  'Manualidades',
  'Juegos de mesa',
].map((categoria) => ({ label: categoria, value: categoria.toLowerCase().replace(' ', '-') }))

type SelectOption = { label: string; value: string };

const faces = [
  {
    file: 'ZPGUKG1CJY.jpg',
    genero: 'F',
    biography: "Apasionada de crear experiencias inolvidables para niños/as y adolescentes con juegos y actividades innovadoras."
  },
  {
    file: 'ZPL6GVT7WK.jpg',
    genero: 'M',
    biography: "Experto en involucrar adolescentes, convirtiendo cualquier espacio en un patio de recreo educativo y divertido."
  },
  {
    file: 'ZQAIW1AENT.jpg',
    genero: 'F',
    biography: "Animadora dinámica especializada en el desarrollo juvenil, fomentando la creatividad, el trabajo en equipo y la confianza."
  },
  {
    file: 'ZPNELKI9CW.jpg',
    genero: 'M',
    biography: "Creador de aventuras para mentes jóvenes, mezclando educación y diversión en experiencias únicas que inspiran."
  },
  {
    file: 'ZQO21VYO81.jpg',
    genero: 'F',
    biography: "Motivadora juvenil y facilitadora de diversión, dedicada a traer sonrisas y alegría con actividades interactivas e inclusivas."
  },
  {
    file: 'ZQ0G6SQ0OV.jpg',
    genero: 'M',
    biography: "Diseñador de juegos innovadores, construyendo momentos memorables para niños/as y adolescentes con una mezcla de educación y entretenimiento."
  },
  {
    file: 'ZRBI9SIQSE.jpg',
    genero: 'F',
    biography: "Guía inspiradora de exploraciones creativas, diseñando actividades que despiertan la imaginación y fomentan el aprendizaje."
  },
  {
    file: 'ZQG3HE5ABF.jpg',
    genero: 'M',
    biography: "Especialista en risas y aprendizaje, usando el juego para enseñar habilidades vitales de manera divertida y memorable."
  },
  {
    file: 'ZRPFVHRRLT.jpg',
    genero: 'F',
    biography: "Facilitadora de descubrimientos, creando un mundo de aventuras educativas que capturan la curiosidad de los jóvenes."
  },
  {
    file: 'ZR6EQV59X0.jpg',
    genero: 'M',
    biography: "Promotor de experiencias educativas interactivas, donde cada juego es una lección de vida llena de diversión."
  },
  {
    file: 'ZRPJRL2EHM.jpg',
    genero: 'F',
    biography: "Catalizadora de creatividad juvenil, impulsando la expresión y el crecimiento personal a través del juego."
  },
  {
    file: 'ZRLCE1VORS.jpg',
    genero: 'M',
    biography: "Profesional en hacer sonreír, convirtiendo el aprendizaje en una aventura emocionante para cada joven."
  },
  {
    file: 'ZRZMX95RCJ.jpg',
    genero: 'F',
    biography: "Innovadora en entretenimiento educativo, transformando lo cotidiano en extraordinarias aventuras de aprendizaje."
  },
  {
    file: 'ZRP4EUI3DN.jpg',
    genero: 'M',
    biography: "Arquitecto de diversión y conocimiento, edificando experiencias que marcan la diferencia en la vida de los jóvenes."
  },
  {
    file: 'ZS3C2GRWXI.jpg',
    genero: 'F',
    biography: "Maestra en el arte de jugar, enseñando que el verdadero aprendizaje viene de la curiosidad y la exploración."
  },
  {
    file: 'ZRP782H9MH.jpg',
    genero: 'M',
    biography: "Creador de momentos mágicos, donde los niños/as y adolescentes descubren pasiones y aprendizajes jugando."
  },
  {
    file: 'ZSS4NNL134.jpg',
    genero: 'F',
    biography: "Impulsora de futuros brillantes, utilizando el juego para desbloquear potenciales y forjar carácter en los jóvenes."
  },
  {
    file: 'ZSLUW5WRZ6.jpg',
    genero: 'M',
    biography: "Pionero en pedagogía lúdica, demostrando que jugar es la forma más natural de aprender y crecer."
  },
  {
    file: 'ZTEUEENMRK.jpg',
    genero: 'F',
    biography: "Especialista en aventuras formativas, donde cada actividad es una oportunidad para aprender jugando."
  },
  {
    file: 'ZSM6OSXQ38.jpg',
    genero: 'M',
    biography: "Visionario en recreación educativa, fusionando juego y educación para desarrollar habilidades y valores.",
  },
]

// Build random profiles
const Profiles = faces.map((face) => ({
  id: faker.number.int(),
  name: faker.person.fullName({ sex: face.genero == 'M' ? 'male' : 'female' }),
  biography: face.biography,
  genero: face.genero,
  image: face.file,
  categorias: faker.helpers.arrayElements(categorias, faker.number.int({ min: 3, max: 5 })),
}));

type CategoriaOption = { value: string; label: string };

function CardFilters({
  value,
  options,
  ...props
}: Props
) {
  return <Select
    value={value}
    options={options}
    isMulti
    closeMenuOnSelect={false}
    hideSelectedOptions={false}
    {...props}
  />
}

function filterProfiles(categorias: CategoriaOption[], genero?: string) {
  let result = Profiles;
  if (categorias.length) {
    result = Profiles.filter((profile) => categorias.some((categoria) => profile.categorias.some((profileCategoria) => profileCategoria.value === categoria.value)))
  }
  if (genero && genero !== '') {
    result = result.filter((profile) => profile.genero === genero)
  }
  return result;
}

const generoOptions = [
  { label: 'Ambos', value: '' },
  { label: 'Hombre', value: 'M' },
  { label: 'Mujer', value: 'F' },
];

export default function CardList() {
  const [profiles, setProfiles] = React.useState(Profiles);
  const [categoria, setCategorias] = React.useState(categorias);
  const [genero, setGenero] = React.useState<string | undefined>(undefined);

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Recreacionistas</h1>
      <h4 className="text-xl text-center py-2">Encuentra el recreacionista ideal para tu evento</h4>
      <CardFilters placeholder={"Filtra categorías"} options={categorias} onChange={(option: SelectOption[]) => {
        setCategorias(option);
        setProfiles(filterProfiles(option, genero));
      }} />
      <div className="py-2">
        <Select placeholder={"Hombre o Mujer"}
          options={generoOptions}
          isClearable
          onChange={(option: SelectOption) => {
            setGenero(option.value);
            setProfiles(filterProfiles(categoria, option.value));
          }} />
      </div>
      <div className="text-left text-md text-gray-500">Resultados: {profiles.length} recreacionistas</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles.length ? profiles.map((profile) => (
          <Card key={profile.id} name={profile.name} biography={profile.biography} image={profile.image} categorias={profile.categorias} />
        )) : <div className="text-center text-2xl font-bold">No hay resultados</div>}
      </div>
    </>
  );
}

function Card({
  name,
  biography,
  image,
  categorias,
}: {
  name: string;
  biography: string;
  image: string;
  categorias: SelectOption[];
}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={`/images/${image}`} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{biography}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {categorias.map((categoria) => (
          <span key={categoria.value} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{categoria.label}</span>
        ))}
      </div>
    </div>
  );
}
