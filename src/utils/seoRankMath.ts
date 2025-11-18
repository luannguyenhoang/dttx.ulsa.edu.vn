export const replaceSeoRM = (input: string) => {
  input = input.replace(
    `link rel="canonical" href="https://admintuxa.ulsa.vn`,
    `link rel="canonical" href="https://dttx.ulsa.edu.vn`
  );

  input = input.replace(
    `meta property="og:url" content="https://admintuxa.ulsa.vn`,
    `meta property="og:url" content="https://dttx.ulsa.edu.vn`
  );

  input = input.replace(
    `"@id":"https://admintuxa.ulsa.vn/#organization"`,
    `"@id":"https://dttx.ulsa.edu.vn/#organization"`
  );

  input = input.replace(
    `https://admintuxa.ulsa.vn/#logo`,
    `https://dttx.ulsa.edu.vn/#logo`
  );

  input = input.replace(
    `https://admintuxa.ulsa.vn/#website`,
    `https://dttx.ulsa.edu.vn/#website`
  );
  input = input.replace(
    `https://admintuxa.ulsa.vn/#webpage`,
    `https://dttx.ulsa.edu.vn/#webpage`
  );
  input = input.replace(
    `"url":"https://admintuxa.ulsa.vn"`,
    `"url":"https://dttx.ulsa.edu.vn"`
  );

  input = input.replace(
    `"@type":"WebPage","@id":"https://admintuxa.ulsa.vn`,
    `"@type":"WebPage","@id":"https://dttx.ulsa.edu.vn`
  );

  input = input.replace(
    `#webpage","url":"https://admintuxa.ulsa.vn`,
    `#webpage","url":"https://dttx.ulsa.edu.vn`
  );

  input = input.replace(
    `"mainEntityOfPage":{"@id":"https://admintuxa.ulsa.vn`,
    `"mainEntityOfPage":{"@id":"https://dttx.ulsa.edu.vn/`
  );
  input = input.replace(
    `"worksFor":{"@id":"https://admintuxa.ulsa.vn/#organization`,
    `"worksFor":{"@id":"https://dttx.ulsa.edu.vn/#organization`
  );

  input = input.replace(
    `"sameAs":["https://admintuxa.ulsa.vn"]`,
    `"sameAs":["https://dttx.ulsa.edu.vn"]`
  );
  return input;
};
