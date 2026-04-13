(function () {
  const LANG_KEY = 'cd_lang';
  const SUPPORTED = ['en', 'fr', 'de'];

  const common = {
    en: {
      home: 'Home',
      guides: 'Guides',
      pricing: 'Pricing',
      generate: 'Generate report',
      updated: 'Updated 12 Apr 2026',
      disclaimer: 'Educational only - not tax advice',
      onPage: 'On this page',
      back: 'Back to guides',
      footerNote: 'Educational content only - review with a Swiss tax advisor for complex cases.'
    },
    fr: {
      home: 'Accueil',
      guides: 'Guides',
      pricing: 'Tarifs',
      generate: 'Generer le rapport',
      updated: 'Mis a jour le 12 avr. 2026',
      disclaimer: 'Contenu educatif - pas un conseil fiscal',
      onPage: 'Sur cette page',
      back: 'Retour aux guides',
      footerNote: 'Contenu educatif uniquement - faites verifier les cas complexes par un conseiller fiscal suisse.'
    },
    de: {
      home: 'Startseite',
      guides: 'Guides',
      pricing: 'Preise',
      generate: 'Bericht erstellen',
      updated: 'Aktualisiert am 12. Apr. 2026',
      disclaimer: 'Nur Bildungsinhalt - keine Steuerberatung',
      onPage: 'Auf dieser Seite',
      back: 'Zurueck zu den Guides',
      footerNote: 'Nur Bildungsinhalt - komplexe Faelle mit einem Schweizer Steuerberater pruefen.'
    }
  };

  const sourceLinks = {
    fr: {
      estv: 'Administration federale des contributions - fiscalite des cryptomonnaies',
      ictax: 'ICTax - valeurs fiscales suisses',
      ictaxIncome: 'ICTax - valeurs fiscales et donnees de revenu',
      circulars: 'Circulaires AFC - contexte du commerce professionnel de titres',
      title: 'Sources officielles'
    },
    de: {
      estv: 'Eidgenoessische Steuerverwaltung - Besteuerung von Kryptowaehrungen',
      ictax: 'ICTax - Schweizer Steuerwerte',
      ictaxIncome: 'ICTax - Steuerwerte und Einkommensdaten',
      circulars: 'ESTV Kreisschreiben - Kontext gewerbsmaessiger Wertschriftenhandel',
      title: 'Offizielle Quellen'
    }
  };

  function sources(lang, type) {
    const s = sourceLinks[lang];
    const items = [
      `<li><a href="https://www.estv.admin.ch/en/cryptocurrencies-taxation" target="_blank" rel="noopener">${s.estv}</a></li>`
    ];
    if (type === 'ictax' || type === 'all') {
      items.push(`<li><a href="https://www.ictax.admin.ch/extern/en.html" target="_blank" rel="noopener">${s.ictax}</a></li>`);
    }
    if (type === 'income') {
      items.push(`<li><a href="https://www.ictax.admin.ch/extern/en.html" target="_blank" rel="noopener">${s.ictaxIncome}</a></li>`);
    }
    if (type === 'circulars' || type === 'all') {
      items.push(`<li><a href="https://www.estv.admin.ch/de/kreisschreiben-direkten-bundessteuer" target="_blank" rel="noopener">${s.circulars}</a></li>`);
    }
    return `<section class="sources"><h2>${s.title}</h2><ul>${items.join('')}</ul></section>`;
  }

  function glossaryArticle(terms, intro, ctaTitle, ctaBody, ctaButton) {
    const cards = terms.map(([term, definition]) =>
      `<section class="glossary-term"><h2>${term}</h2><p>${definition}</p></section>`
    ).join('');
    return `
      <p class="glossary-intro">${intro}</p>
      <div class="glossary-grid">${cards}</div>
      <section class="cta-panel"><h2>${ctaTitle}</h2><p>${ctaBody}</p><a class="button" href="/#upload-area">${ctaButton}</a></section>
    `;
  }

  const pages = {
    index: {
      fr: {
        title: 'Guides fiscaux crypto suisses | CryptoDeclare',
        description: 'Guides fiscaux crypto suisses en langage clair: fortune, staking, FIFO, historique manquant et exports CSV.',
        eyebrow: 'Guides fiscaux crypto suisses',
        h1: 'Comprendre les regles avant <em>d importer votre CSV</em>.',
        copy: 'Explications claires et pratiques pour les detenteurs de crypto en Suisse: quoi declarer, comment le staking est traite, pourquoi l historique FIFO compte, et que faire lorsque des plateformes ou wallets manquent.',
        cards: [
          ['Commencer ici', 'Guide fiscal crypto suisse', 'Vue d ensemble pratique: valeurs de fortune, gains prives, revenus et documentation.'],
          ['Etape par etape', 'Comment declarer ses cryptos en Suisse', 'Quoi rassembler, comment structurer le rapport et quoi joindre a la declaration cantonale.'],
          ['Impot sur la fortune', 'Impot sur la fortune crypto en Suisse', 'Pourquoi les avoirs de fin d annee comptent et comment les valeurs au 31 decembre s integrent a la declaration.'],
          ['Revenus', 'Fiscalite du staking en Suisse', 'Comment distinguer staking, rewards, interets et lending des gains en capital.'],
          ['Cout d acquisition', 'FIFO crypto en Suisse', 'Pourquoi l historique d acquisition compte pour calculer les cessions et rapprocher les lots.'],
          ['Qualite des donnees', 'Historique de transactions manquant', 'Ce que signifient les cessions non rapprochees et comment corriger les imports incomplets.'],
          ['Exports CSV', 'Rapports fiscaux depuis CSV d exchange', 'Comment Coinbase, Binance, Kraken, Swissquote, SwissBorg et autres exports deviennent une annexe fiscale.'],
          ['Statut', 'Investisseur prive ou trader professionnel', 'La distinction qui peut changer le traitement des gains comme gains prives ou revenu imposable.'],
          ['Glossaire', 'Glossaire fiscal crypto suisse', 'Definitions courtes des termes crypto et fiscaux suisses vus dans les exports, rapports et avertissements.']
        ],
        ctaTitle: 'Pret a transformer vos exports en annexe fiscale suisse ?',
        ctaBody: 'CryptoDeclare aide a organiser les transactions importees dans un rapport structure avec resultats FIFO, revenus de staking, valeurs de fortune et avertissements de completude.',
        ctaButton: 'Generer mon rapport'
      },
      de: {
        title: 'Schweizer Krypto-Steuerguides | CryptoDeclare',
        description: 'Verstaendliche Schweizer Krypto-Steuerguides zu Vermoegenssteuer, Staking-Ertraegen, FIFO, fehlender Historie und CSV-Exporten.',
        eyebrow: 'Schweizer Krypto-Steuerguides',
        h1: 'Die Regeln verstehen, bevor Sie <em>Ihre CSV hochladen</em>.',
        copy: 'Klare, praktische Erklaerungen fuer Schweizer Krypto-Inhaber: was zu deklarieren ist, wie Staking behandelt wird, warum FIFO-Historie wichtig ist und was bei fehlenden Boersen oder Wallets zu tun ist.',
        cards: [
          ['Hier starten', 'Schweizer Krypto-Steuerguide', 'Praktische Uebersicht zu Vermoegenswerten, privaten Kapitalgewinnen, Einkuenften und Dokumentation.'],
          ['Schritt fuer Schritt', 'Krypto in der Schweiz deklarieren', 'Was Sie sammeln sollten, wie der Bericht strukturiert wird und was der kantonalen Steuererklaerung beizulegen ist.'],
          ['Vermoegenssteuer', 'Krypto-Vermoegenssteuer in der Schweiz', 'Warum Jahresendbestaende zaehlen und wie Werte per 31. Dezember in die Deklaration passen.'],
          ['Einkommen', 'Staking-Steuern in der Schweiz', 'Wie Staking, Rewards, Zinsen und Lending von Gewinnen getrennt werden sollten.'],
          ['Kostenbasis', 'FIFO-Krypto-Steuer Schweiz', 'Warum Anschaffungshistorie fuer Verkaeufe und Lot-Abgleich wichtig ist.'],
          ['Datenqualitaet', 'Fehlende Krypto-Transaktionshistorie', 'Was nicht zugeordnete Verkaeufe bedeuten und wie unvollstaendige Importe korrigiert werden.'],
          ['CSV-Exporte', 'Steuerberichte aus Exchange-CSV', 'Wie Coinbase, Binance, Kraken, Swissquote, SwissBorg und andere Exporte zu einer Steuerbeilage werden.'],
          ['Status', 'Privatanleger oder professioneller Trader', 'Die Unterscheidung, die beeinflussen kann, ob Gewinne privat oder als Einkommen behandelt werden.'],
          ['Glossar', 'Schweizer Krypto-Steuerglossar', 'Kurze Erklaerungen der Krypto- und Schweizer Steuerbegriffe in Exporten, Berichten und Warnungen.']
        ],
        ctaTitle: 'Bereit, Ihre Exporte in eine Schweizer Steuerbeilage zu verwandeln?',
        ctaBody: 'CryptoDeclare hilft, importierte Krypto-Transaktionen in einem strukturierten Bericht mit FIFO-Resultaten, Staking-Ertraegen, Jahresendwerten und Vollstaendigkeitswarnungen zu organisieren.',
        ctaButton: 'Bericht erstellen'
      }
    },

    'swiss-crypto-tax-guide': {
      fr: {
        title: 'Guide fiscal crypto suisse 2026 | CryptoDeclare',
        description: 'Guide pratique pour particuliers suisses: fortune, gains prives, staking, FIFO et documentation.',
        eyebrow: 'Guide fiscal crypto suisse',
        h1: 'Comment fonctionne la fiscalite crypto en <em>Suisse</em>.',
        copy: 'Vue d ensemble pratique pour les particuliers suisses qui preparent une annexe fiscale crypto.',
        article: `
          <p>Le reporting fiscal crypto en Suisse revient souvent a trois questions: quels actifs vous deteniez en fin d annee, quels revenus vous avez recus, et si un resultat de trading realise doit etre documente. La reponse depend de votre statut fiscal personnel et de la completude de votre historique.</p>
          <div class="callout">Pour beaucoup de particuliers suisses, les gains en capital prives sur la fortune mobiliere sont generalement exoneres. Mais les avoirs doivent tout de meme etre declares comme fortune, et les revenus comme les recompenses de staking doivent souvent etre separes.</div>
          <h2 id="wealth">1. Les avoirs crypto sont declares comme fortune</h2>
          <p>Les cryptoactifs detenus au 31 decembre font partie de la fortune imposable. Le chiffre central est la valeur de fin d annee en CHF pour chaque actif encore detenu. Lorsque des valeurs fiscales officielles existent, les contribuables utilisent souvent des valeurs de reference publiees comme ICTax.</p>
          <p>Si vous detenez des actifs sur plusieurs plateformes ou wallets, il faut consolider la position de fin d annee. Les transferts entre vos propres wallets ne doivent pas etre traites comme des ventes, mais ils influencent le suivi de l historique d acquisition.</p>
          <h2 id="gains">2. Les gains prives sont differents des revenus</h2>
          <p>Pour les particuliers suisses, les gains provenant d actifs prives sont generalement traites differemment du revenu. Il est donc important de separer les calculs de gains/pertes realises des revenus imposables comme staking, lending, salaire en crypto, recompenses proches du mining ou activite professionnelle.</p>
          <p>Si vous etes traite comme trader professionnel ou via une entite juridique, l analyse peut changer fortement. Les cas complexes doivent etre revus avec un conseiller fiscal suisse qualifie.</p>
          <h2 id="staking">3. Staking et rewards doivent etre separes</h2>
          <p>Les recompenses de staking, produits earn, interets, lending et revenus similaires ne doivent pas etre melanges aux gains prives. Ils sont habituellement documentes comme revenus avec une valeur CHF, selon les donnees disponibles dans l export et les references de marche.</p>
          <h2 id="fifo">4. L historique FIFO explique les cessions</h2>
          <p>Lorsque vous vendez ou echangez des cryptos, un rapport doit montrer quels lots d acquisition ont ete utilises pour calculer le resultat. FIFO, premier entre premier sorti, est une methode pratique pour rapprocher acquisitions et cessions. Des achats manquants creent des cessions non rapprochees et des resultats moins fiables.</p>
          <h2 id="records">5. Conserver les justificatifs</h2>
          <p>Une annexe claire n est pas seulement un chiffre final. Elle doit inclure les sources de transactions, resumes par actif, avoirs de fin d annee, revenus de staking, resultats realises, notes sur l historique incomplet et un ledger revisable par vous ou votre conseiller.</p>
          <div class="warning">Ce guide est un contenu educatif general. La fiscalite crypto depend de votre canton, situation personnelle, completude des donnees et statut de particulier, trader professionnel ou entite juridique.</div>
          ${sources('fr', 'all')}
          <section class="cta-panel"><h2>Generer une annexe fiscale crypto suisse</h2><p>Importez vos fichiers d exchange et CryptoDeclare organise les resultats FIFO, revenus de staking, valeurs de fortune et avertissements de completude dans une annexe structuree.</p><a class="button" href="/#upload-area">Generer mon rapport</a></section>
        `,
        toc: [['wealth', 'Fortune'], ['gains', 'Gains vs revenus'], ['staking', 'Staking'], ['fifo', 'FIFO'], ['records', 'Justificatifs']]
      },
      de: {
        title: 'Schweizer Krypto-Steuerguide 2026 | CryptoDeclare',
        description: 'Praktischer Schweizer Krypto-Steuerguide fuer Privatpersonen: Vermoegen, private Kapitalgewinne, Staking, FIFO und Dokumentation.',
        eyebrow: 'Schweizer Krypto-Steuerguide',
        h1: 'Wie Krypto-Besteuerung in der <em>Schweiz</em> funktioniert.',
        copy: 'Praktische Uebersicht fuer Schweizer Privatpersonen, die eine Krypto-Steuerbeilage vorbereiten.',
        article: `
          <p>Schweizer Krypto-Steuerreporting laesst sich meist auf drei Fragen reduzieren: was Sie am Jahresende hielten, welche Einkuenfte Sie erhalten haben und ob ein realisiertes Trading-Ergebnis dokumentiert werden muss. Die Antwort haengt von Ihrem persoenlichen Steuerstatus und der Vollstaendigkeit Ihrer Transaktionshistorie ab.</p>
          <div class="callout">Fuer viele Schweizer Privatpersonen sind private Kapitalgewinne auf beweglichem Vermoegen grundsaetzlich steuerfrei. Bestaende muessen aber als Vermoegen deklariert werden, und Einkuenfte wie Staking-Ertraege muessen oft separat ausgewiesen werden.</div>
          <h2 id="wealth">1. Krypto-Bestaende werden als Vermoegen deklariert</h2>
          <p>Krypto-Assets per 31. Dezember gehoeren zum steuerbaren Vermoegen. Entscheidend ist der Jahresendwert in CHF fuer jedes gehaltene Asset. Wenn offizielle Steuerwerte vorhanden sind, werden haeufig publizierte Referenzwerte wie ICTax verwendet.</p>
          <p>Wenn Sie Assets ueber mehrere Boersen und Wallets halten, brauchen Sie eine konsolidierte Jahresendposition. Transfers zwischen eigenen Wallets sollten nicht als Verkaeufe behandelt werden, beeinflussen aber die Nachverfolgung der Anschaffungshistorie.</p>
          <h2 id="gains">2. Private Kapitalgewinne unterscheiden sich von Einkommen</h2>
          <p>Fuer Schweizer Privatpersonen werden Gewinne aus Privatvermoegen grundsaetzlich anders behandelt als Einkommen. Deshalb sollten realisierte Gewinne/Verluste von steuerbarem Einkommen wie Staking, Lending, Lohn in Krypto, mining-aehnlichen Rewards oder professioneller Aktivitaet getrennt werden.</p>
          <p>Wenn Sie als professioneller Trader oder ueber eine juristische Person gelten, kann sich die Analyse deutlich aendern. Komplexe Faelle sollten durch einen qualifizierten Schweizer Steuerberater geprueft werden.</p>
          <h2 id="staking">3. Staking und Rewards sollten getrennt werden</h2>
          <p>Staking-Rewards, Earn-Produkte, Zinsen, Lending-Ertraege und aehnliche Ereignisse sollten nicht in private Kapitalgewinne gemischt werden. Sie werden ueblicherweise als Einkommen mit CHF-Wert dokumentiert, basierend auf Exportdaten und Marktreferenzen.</p>
          <h2 id="fifo">4. FIFO-Historie erklaert Verkaeufe</h2>
          <p>Wenn Sie Krypto verkaufen oder tauschen, sollte ein Bericht zeigen, welche Anschaffungslot fuer die Berechnung verwendet wurden. FIFO, first in first out, ist eine praktische Methode, um Anschaffungen und Verkaeufe abzugleichen. Fehlende Kaeufe koennen nicht zugeordnete Verkaeufe und unzuverlaessige Resultate erzeugen.</p>
          <h2 id="records">5. Belege aufbewahren</h2>
          <p>Eine saubere Beilage ist mehr als eine Endzahl. Sie sollte Quellen, Asset-Zusammenfassungen, Jahresendbestaende, Staking-Ertraege, realisierte Resultate, Hinweise zu unvollstaendiger Historie und einen pruefbaren Ledger enthalten.</p>
          <div class="warning">Dieser Guide ist allgemeiner Bildungsinhalt. Krypto-Besteuerung haengt von Kanton, persoenlicher Situation, Datenvollstaendigkeit und Status als Privatanleger, professioneller Trader oder juristische Person ab.</div>
          ${sources('de', 'all')}
          <section class="cta-panel"><h2>Schweizer Krypto-Steuerbeilage erstellen</h2><p>Laden Sie Ihre Exchange-Dateien hoch und CryptoDeclare organisiert FIFO-Resultate, Staking-Ertraege, Vermoegenswerte und Vollstaendigkeitswarnungen in einer strukturierten Beilage.</p><a class="button" href="/#upload-area">Bericht erstellen</a></section>
        `,
        toc: [['wealth', 'Vermoegen'], ['gains', 'Gewinne vs Einkommen'], ['staking', 'Staking'], ['fifo', 'FIFO'], ['records', 'Belege']]
      }
    },

    'how-to-declare-crypto-switzerland': {
      fr: {
        title: 'Comment declarer ses cryptos en Suisse | CryptoDeclare',
        description: 'Guide etape par etape pour declarer ses cryptos en Suisse: exports, valeurs CHF, staking et annexe fiscale.',
        eyebrow: 'Etape par etape',
        h1: 'Comment declarer ses cryptos en <em>Suisse</em>.',
        copy: 'Un workflow simple pour transformer des exports d exchange en documentation pour une declaration fiscale cantonale suisse.',
        article: `
          <p>La plupart des problemes fiscaux crypto commencent par des donnees fragmentees. Une plateforme contient les achats, une autre les ventes, un wallet contient les transferts, et les revenus de staking peuvent etre caches dans un export earn ou rewards. Un bon workflow commence par tout rassembler avant de calculer.</p>
          <h2 id="collect">1. Exporter tout l historique</h2>
          <p>Telechargez les exports CSV ou Excel de chaque exchange, broker, wallet app et plateforme utilisee. Incluez trades, depots, retraits, rewards, staking, interets, frais et conversions. Si vous importez uniquement l annee fiscale mais que les actifs ont ete acquis plus tot, certaines cessions peuvent manquer de cout d acquisition.</p>
          <h2 id="classify">2. Classer chaque transaction</h2>
          <p>Les transactions doivent etre groupees en categories pratiques: achats, ventes, transferts, staking/rewards, frais et lignes ambigues. Les transferts entre vos propres comptes ne doivent pas creer de gains artificiels, mais ils restent importants pour tracer l historique d acquisition.</p>
          <h2 id="chf">3. Convertir en CHF</h2>
          <p>Le reporting suisse necessite des valeurs en CHF. Certaines plateformes suisses exportent directement les valeurs CHF. D autres exports demandent une conversion de devise ou des references de marche a la date de transaction ou pour la valorisation de fin d annee.</p>
          <h2 id="summary">4. Preparer l annexe</h2>
          <p>Une annexe crypto utile doit inclure les avoirs et valeurs de fin d annee, les revenus de staking ou rewards, les resultats FIFO realises, le nombre de transactions, les notes sur l historique manquant et un ledger de transactions.</p>
          <h2 id="review">5. Relire avant de soumettre</h2>
          <p>Verifiez toujours que toutes les plateformes et wallets sont inclus. Si le rapport signale des cessions non rapprochees ou un historique d acquisition manquant, corrigez ces points avant de vous appuyer sur la section gains/pertes.</p>
          <div class="callout">CryptoDeclare suit ce workflow: importer les fichiers, calculer une annexe suisse, revoir les avertissements, puis exporter le rapport pour la declaration cantonale.</div>
          ${sources('fr', 'ictax')}
          <section class="cta-panel"><h2>Transformer vos CSV en annexe</h2><p>Importez des exports compatibles et obtenez un rapport structure avec valeurs de fortune, revenus de staking, FIFO et controles de completude.</p><a class="button" href="/#upload-area">Generer mon rapport</a></section>
        `,
        toc: [['collect', 'Collecter'], ['classify', 'Classer'], ['chf', 'Valeurs CHF'], ['summary', 'Annexe'], ['review', 'Relecture']]
      },
      de: {
        title: 'Krypto in der Schweiz deklarieren | CryptoDeclare',
        description: 'Schritt-fuer-Schritt-Guide zur Krypto-Deklaration in der Schweiz: Exporte, CHF-Werte, Staking und Steuerbeilage.',
        eyebrow: 'Schritt fuer Schritt',
        h1: 'Krypto in der <em>Schweiz</em> deklarieren.',
        copy: 'Ein einfacher Workflow, um Exchange-Exporte in Belege fuer eine kantonale Schweizer Steuererklaerung zu verwandeln.',
        article: `
          <p>Die meisten Krypto-Steuerprobleme beginnen mit fragmentierten Daten. Eine Boerse hat Kaeufe, eine andere Verkaeufe, eine Wallet enthaelt Transfers und Staking-Ertraege stecken eventuell in einem separaten Earn- oder Reward-Export. Ein guter Workflow sammelt zuerst alles, bevor gerechnet wird.</p>
          <h2 id="collect">1. Vollstaendige Historie exportieren</h2>
          <p>Laden Sie CSV- oder Excel-Exporte von jeder Boerse, jedem Broker, jeder Wallet-App und jeder Plattform herunter. Einschliessen sollten Sie Trades, Einzahlungen, Auszahlungen, Rewards, Staking, Zinsen, Gebuehren und Konvertierungen. Wenn Sie nur das Steuerjahr importieren, aber Assets frueher gekauft wurden, fehlt bei Verkaeufen eventuell die Kostenbasis.</p>
          <h2 id="classify">2. Jede Transaktion klassifizieren</h2>
          <p>Transaktionen sollten in praktische Steuerkategorien gruppiert werden: Kaeufe, Verkaeufe, Transfers, Staking/Rewards, Gebuehren und unklare Zeilen. Transfers zwischen eigenen Konten sollten keine kuenstlichen Gewinne erzeugen, sind aber wichtig fuer die Anschaffungshistorie.</p>
          <h2 id="chf">3. Werte in CHF umrechnen</h2>
          <p>Schweizer Reporting braucht CHF-Werte. Einige Schweizer Plattformen exportieren CHF-Werte direkt. Andere Exporte benoetigen Waehrungsumrechnung oder Marktreferenzen fuer das Transaktionsdatum oder die Jahresendbewertung.</p>
          <h2 id="summary">4. Beilage vorbereiten</h2>
          <p>Eine nuetzliche Krypto-Steuerbeilage sollte Jahresendbestaende und Werte, Staking- oder Reward-Einkuenfte, realisierte FIFO-Resultate, Transaktionszahlen, Hinweise zu fehlender Historie und einen Transaktionsledger enthalten.</p>
          <h2 id="review">5. Vor dem Einreichen pruefen</h2>
          <p>Pruefen Sie immer, ob alle Boersen und Wallets enthalten sind. Wenn der Bericht nicht zugeordnete Verkaeufe oder fehlende Anschaffungshistorie meldet, sollten diese Punkte vor der Nutzung der Gewinn/Verlust-Sektion korrigiert werden.</p>
          <div class="callout">CryptoDeclare ist um diesen Workflow gebaut: Dateien hochladen, Schweizer Beilage berechnen, Warnungen pruefen und den Bericht fuer die kantonale Steuererklaerung exportieren.</div>
          ${sources('de', 'ictax')}
          <section class="cta-panel"><h2>CSV-Exporte in eine Beilage verwandeln</h2><p>Laden Sie unterstuetzte Exporte hoch und erhalten Sie einen strukturierten Bericht mit Vermoegenswerten, Staking-Ertraegen, FIFO-Resultaten und Vollstaendigkeitspruefungen.</p><a class="button" href="/#upload-area">Bericht erstellen</a></section>
        `,
        toc: [['collect', 'Dateien sammeln'], ['classify', 'Ereignisse klassifizieren'], ['chf', 'CHF-Werte'], ['summary', 'Beilage'], ['review', 'Pruefen']]
      }
    },

    'crypto-wealth-tax-switzerland': {
      fr: {
        title: 'Impot sur la fortune crypto en Suisse | CryptoDeclare',
        description: 'Comment penser aux valeurs de fin d annee, aux avoirs du 31 decembre et au reporting des cryptoactifs en Suisse.',
        eyebrow: 'Impot sur la fortune',
        h1: 'Impot sur la fortune crypto en <em>Suisse</em>.',
        copy: 'Pourquoi la valeur du portefeuille au 31 decembre compte, meme lorsque les gains prives peuvent etre exoneres.',
        article: `
          <p>En Suisse, les cryptoactifs detenus par des particuliers font generalement partie de la fortune imposable. La valeur de fin d annee peut donc compter meme si vous n avez rien vendu durant l annee.</p>
          <h2 id="date">La date cle est le 31 decembre</h2>
          <p>La declaration demande en general la valeur des actifs a la fin de l annee fiscale. Pour les cryptos, cela signifie prendre la quantite detenue au 31 decembre et lui attribuer une valeur CHF. Les quantites doivent etre consolidees entre plateformes et wallets.</p>
          <h2 id="prices">Quel prix utiliser ?</h2>
          <p>Les contribuables suisses se referent souvent aux valeurs fiscales officielles ou reconnues lorsqu elles existent, notamment les valeurs ICTax. Si aucune valeur officielle n existe pour un token, il peut falloir documenter une valeur de marche raisonnable ou une valeur d acquisition selon la situation.</p>
          <h2 id="transfers">Les transferts ne sont pas des ventes</h2>
          <p>Deplacer du BTC de Kraken vers un wallet personnel ne doit pas etre traite comme une vente. Mais les transferts restent importants car ils expliquent pourquoi un actif disparait d un export et apparait ailleurs.</p>
          <h2 id="report">Ce qu une section fortune doit montrer</h2>
          <p>Un rapport clair doit montrer chaque actif, la quantite finale, la valeur CHF au 31 decembre et les notes lorsque la valeur ne peut pas etre resolue depuis les donnees importees ou les references disponibles.</p>
          <div class="warning">La valeur de fortune n est qu une partie de la declaration. Staking, lending, activite professionnelle et autres revenus peuvent necessiter un traitement separe.</div>
          ${sources('fr', 'ictax')}
          <section class="cta-panel"><h2>Calculer les valeurs de fortune crypto</h2><p>CryptoDeclare calcule les avoirs au 31 decembre et les valeurs de portefeuille depuis vos fichiers importes.</p><a class="button" href="/#upload-area">Generer mon rapport</a></section>
        `,
        toc: [['date', '31 decembre'], ['prices', 'Prix'], ['transfers', 'Transferts'], ['report', 'Section rapport']]
      },
      de: {
        title: 'Krypto-Vermoegenssteuer Schweiz | CryptoDeclare',
        description: 'Wie Schweizer Krypto-Inhaber ueber Jahresendwerte, Bestaende per 31. Dezember und Krypto-Reporting nachdenken sollten.',
        eyebrow: 'Vermoegenssteuer',
        h1: 'Krypto-Vermoegenssteuer in der <em>Schweiz</em>.',
        copy: 'Warum der Portfoliowert per 31. Dezember wichtig ist, auch wenn private Kapitalgewinne steuerfrei sein koennen.',
        article: `
          <p>In der Schweiz werden Krypto-Assets von Privatpersonen in der Regel als Teil des steuerbaren Vermoegens behandelt. Der Jahresendwert Ihrer Bestaende kann also relevant sein, auch wenn Sie im Jahr nichts verkauft haben.</p>
          <h2 id="date">Der Schluesseltag ist der 31. Dezember</h2>
          <p>Die Steuererklaerung benoetigt normalerweise den Wert Ihrer Vermoegenswerte am Ende des Steuerjahres. Bei Krypto bedeutet das: Menge per 31. Dezember nehmen und einen CHF-Wert zuordnen. Bestaende ueber Boersen und Wallets sollten konsolidiert werden.</p>
          <h2 id="prices">Welchen Preis verwenden?</h2>
          <p>Schweizer Steuerpflichtige orientieren sich haeufig an offiziellen oder anerkannten Steuerwerten, sofern vorhanden, einschliesslich ICTax-Werten. Wenn kein offizieller Wert existiert, kann eine dokumentierte, angemessene Marktbewertung oder Anschaffungswert relevant sein.</p>
          <h2 id="transfers">Transfers sind keine Verkaeufe</h2>
          <p>BTC von Kraken in eine eigene Wallet zu bewegen, sollte nicht wie ein Verkauf behandelt werden. Transfers sind aber wichtig, weil sie erklaeren, warum ein Asset in einem Export verschwindet und anderswo erscheint.</p>
          <h2 id="report">Was die Vermoegenssektion zeigen sollte</h2>
          <p>Ein sauberer Bericht sollte jedes Asset, Schlussmenge, CHF-Wert per 31. Dezember und Hinweise zeigen, wenn der Wert aus Importdaten oder Referenzen nicht aufgeloest werden konnte.</p>
          <div class="warning">Der Vermoegenswert ist nur ein Teil der Deklaration. Staking, Lending, professionelle Aktivitaet und andere Einkuenfte koennen separat zu behandeln sein.</div>
          ${sources('de', 'ictax')}
          <section class="cta-panel"><h2>Jahresendwerte fuer Krypto berechnen</h2><p>CryptoDeclare berechnet Bestaende per 31. Dezember und Portfoliowerte aus Ihren importierten Exchange-Dateien.</p><a class="button" href="/#upload-area">Bericht erstellen</a></section>
        `,
        toc: [['date', '31. Dezember'], ['prices', 'Preise'], ['transfers', 'Transfers'], ['report', 'Bericht']]
      }
    },

    'staking-tax-switzerland': {
      fr: {
        title: 'Fiscalite du staking en Suisse | CryptoDeclare',
        description: 'Guide suisse sur le staking crypto: rewards, earn, lending et difference avec les gains prives.',
        eyebrow: 'Revenus de staking',
        h1: 'Comment le staking est traite pour la <em>fiscalite crypto suisse</em>.',
        copy: 'Les recompenses de staking doivent etre separees des gains prives et documentees comme revenus lorsque applicable.',
        article: `
          <p>Les recompenses de staking sont une des raisons les plus frequentes pour lesquelles un portefeuille crypto simple devient difficile a declarer. Le probleme n est pas seulement la frequence des rewards, mais leur categorie fiscale differente des gains prives.</p>
          <h2 id="income">Le staking est souvent une question de revenu</h2>
          <p>Si vous recevez des cryptos parce que vous avez stake, prete, depose dans un produit earn ou recu des interets, l evenement peut devoir etre declare comme revenu en CHF. C est different du simple fait de detenir un actif ou de le vendre plus tard comme investisseur prive.</p>
          <h2 id="value">La valeur CHF compte</h2>
          <p>Pour chaque reward, un rapport doit identifier l actif, la quantite, la date et la valeur CHF lorsque possible. Certaines plateformes exportent directement les valeurs, d autres uniquement les quantites.</p>
          <h2 id="later-sale">Les ventes ulterieures sont des evenements separes</h2>
          <p>Si vous vendez ensuite une crypto recue comme revenu de staking, cette vente doit aussi apparaitre dans le ledger. Un bon reporting garde l evenement de revenu et la cession ulterieure separes.</p>
          <h2 id="report">Ce que votre annexe doit montrer</h2>
          <p>L annexe doit inclure un total separe pour le staking ou les rewards, et ne pas les cacher dans les gains en capital. Elle doit aussi montrer les evenements dans le ledger pour permettre la verification.</p>
          <div class="callout">CryptoDeclare identifie staking, earn, interets, cashback, rewards et evenements similaires dans les exports compatibles et les separe des resultats FIFO realises.</div>
          ${sources('fr', 'income')}
          <section class="cta-panel"><h2>Separer staking et gains</h2><p>Importez vos fichiers et CryptoDeclare separe revenus de staking, resultats FIFO et valeurs de fortune dans un seul rapport.</p><a class="button" href="/#upload-area">Generer mon rapport</a></section>
        `,
        toc: [['income', 'Revenu'], ['value', 'Valeur CHF'], ['later-sale', 'Ventes ulterieures'], ['report', 'Rapport']]
      },
      de: {
        title: 'Staking-Steuer Schweiz | CryptoDeclare',
        description: 'Schweizer Guide zu Krypto-Staking-Steuern: Rewards, Earn-Produkte, Lending-Ertraege und Unterschied zu privaten Kapitalgewinnen.',
        eyebrow: 'Staking-Ertraege',
        h1: 'Wie Staking fuer die <em>Schweizer Krypto-Steuer</em> behandelt wird.',
        copy: 'Staking-Rewards sollten von privaten Kapitalgewinnen getrennt und als Einkommensereignisse dokumentiert werden, sofern relevant.',
        article: `
          <p>Staking-Rewards sind einer der haeufigsten Gruende, warum ein einfaches Krypto-Portfolio steuerlich schwierig wird. Das Problem ist nicht nur die haeufige Gutschrift, sondern dass Rewards meist eine andere Steuerkategorie sind als private Kapitalgewinne.</p>
          <h2 id="income">Staking ist oft eine Einkommensfrage</h2>
          <p>Wenn Sie Krypto erhalten, weil Sie gestaked, verliehen, in ein Earn-Produkt eingezahlt oder zinsaehnliche Rewards erhalten haben, kann das Ereignis als Einkommen in CHF zu melden sein. Das unterscheidet sich vom blossen Halten oder spaeteren Verkauf als Privatanleger.</p>
          <h2 id="value">Der CHF-Wert ist wichtig</h2>
          <p>Fuer jedes Reward-Ereignis sollte ein Bericht Asset, Menge, Datum und CHF-Wert identifizieren, soweit moeglich. Einige Plattformen exportieren Werte direkt, andere nur Mengen.</p>
          <h2 id="later-sale">Spaetere Verkaeufe sind separate Ereignisse</h2>
          <p>Wenn Sie spaeter Krypto verkaufen, die zuvor als Staking-Einkommen erhalten wurde, sollte dieser Verkauf ebenfalls im Ledger erscheinen. Gutes Reporting trennt Einkommen und spaetere Veraeusserung.</p>
          <h2 id="report">Was Ihre Beilage zeigen sollte</h2>
          <p>Die Steuerbeilage sollte eine separate Summe fuer Staking oder Rewards enthalten und diese nicht in Kapitalgewinnen verstecken. Auch die einzelnen Reward-Ereignisse sollten im Ledger nachvollziehbar sein.</p>
          <div class="callout">CryptoDeclare identifiziert Staking, Earn, Zinsen, Cashback, Rewards und aehnliche Einkommensereignisse in unterstuetzten Exporten und weist sie getrennt von realisierten FIFO-Resultaten aus.</div>
          ${sources('de', 'income')}
          <section class="cta-panel"><h2>Staking-Einkommen von Gewinnen trennen</h2><p>Laden Sie Ihre Dateien hoch und CryptoDeclare trennt Staking-Ertraege, FIFO-Resultate und Jahresendwerte in einem Bericht.</p><a class="button" href="/#upload-area">Bericht erstellen</a></section>
        `,
        toc: [['income', 'Einkommen'], ['value', 'CHF-Wert'], ['later-sale', 'Spaetere Verkaeufe'], ['report', 'Bericht']]
      }
    },

    'fifo-crypto-tax-switzerland': {
      fr: {
        title: 'FIFO crypto en Suisse | CryptoDeclare',
        description: 'Comprendre la methode FIFO pour le reporting fiscal crypto suisse et pourquoi l historique d acquisition compte.',
        eyebrow: 'Cout d acquisition',
        h1: 'Reporting fiscal crypto FIFO en <em>Suisse</em>.',
        copy: 'FIFO aide a expliquer quels lots d acquisition ont ete utilises lorsqu une crypto est vendue, echangee ou cedee.',
        article: `
          <p>FIFO signifie premier entre, premier sorti. Dans un rapport crypto, c est une facon de rapprocher les cessions avec les premiers lots d acquisition disponibles. Cela produit un cout d acquisition et un resultat realise lorsque l historique est suffisant.</p>
          <h2 id="example">Exemple FIFO simple</h2>
          <p>Si vous achetez 1 BTC en janvier puis 1 BTC en juin, et vendez 1 BTC en novembre, FIFO considere que le lot de janvier est vendu en premier. Le resultat est calcule en comparant la valeur de cession avec le cout de ce lot.</p>
          <h2 id="history">FIFO depend de l historique complet</h2>
          <p>La methode fonctionne seulement si le rapport dispose de suffisamment d historique d acquisition. Si vous importez seulement l exchange de vente mais que l achat a eu lieu ailleurs, le cout d origine peut manquer et doit etre signale.</p>
          <h2 id="swaps">Swaps et trades crypto-crypto</h2>
          <p>Un swap peut creer a la fois une cession d un actif et une acquisition d un autre. Le rapport doit identifier les deux cotes pour conserver la future base de cout.</p>
          <h2 id="report">Ce qu un rapport FIFO doit inclure</h2>
          <p>Une bonne annexe montre les achats et ventes par actif, le resultat realise, les quantites non rapprochees, les proceeds exclus lorsque l historique manque, et un ledger qui soutient le calcul.</p>
          <div class="warning">FIFO est une methode de calcul, pas une solution magique aux donnees manquantes. Si l historique d acquisition est incomplet, un outil responsable doit signaler l ecart.</div>
          ${sources('fr', 'estv')}
          <section class="cta-panel"><h2>Lancer les calculs FIFO depuis vos fichiers</h2><p>CryptoDeclare applique la logique FIFO, montre les avertissements d historique manquant et exporte une annexe structuree.</p><a class="button" href="/#upload-area">Generer mon rapport</a></section>
        `,
        toc: [['example', 'Exemple'], ['history', 'Historique'], ['swaps', 'Swaps'], ['report', 'Rapport']]
      },
      de: {
        title: 'FIFO-Krypto-Steuer Schweiz | CryptoDeclare',
        description: 'Lernen Sie, wie FIFO-Kostenbasis fuer Schweizer Krypto-Steuerreporting funktioniert und warum Anschaffungshistorie wichtig ist.',
        eyebrow: 'Kostenbasis',
        h1: 'FIFO-Krypto-Steuerreporting in der <em>Schweiz</em>.',
        copy: 'FIFO hilft zu erklaeren, welche Anschaffungslots bei Verkauf, Tausch oder anderer Veraeusserung verwendet wurden.',
        article: `
          <p>FIFO bedeutet first in, first out. In einem Krypto-Bericht ist es eine Methode, Verkaeufe mit den fruehesten verfuegbaren Anschaffungslots abzugleichen. Daraus entstehen Kostenbasis und realisiertes Resultat, wenn genug Historie vorhanden ist.</p>
          <h2 id="example">Einfaches FIFO-Beispiel</h2>
          <p>Wenn Sie im Januar 1 BTC und im Juni einen weiteren BTC kaufen und im November 1 BTC verkaufen, behandelt FIFO den Januar-Lot als zuerst verkauft. Das Resultat vergleicht den Verkaufserloes mit der Kostenbasis dieses Lots.</p>
          <h2 id="history">FIFO haengt von vollstaendiger Historie ab</h2>
          <p>Die Methode funktioniert nur, wenn genug Anschaffungshistorie vorhanden ist. Wenn Sie nur die Verkaufsboerse importieren, der Kauf aber anderswo stattfand, kennt der Bericht die urspruengliche Kostenbasis eventuell nicht und sollte dies markieren.</p>
          <h2 id="swaps">Swaps und Krypto-zu-Krypto-Trades</h2>
          <p>Ein Swap kann gleichzeitig eine Veraeusserung eines Assets und eine Anschaffung eines anderen Assets erzeugen. Der Bericht sollte beide Seiten erkennen, damit zukuenftige Kostenbasis erhalten bleibt.</p>
          <h2 id="report">Was ein FIFO-Bericht enthalten sollte</h2>
          <p>Eine gute Beilage zeigt Kauf- und Verkaufszahlen je Asset, realisiertes Resultat, nicht zugeordnete Mengen, ausgeschlossene Erloese bei fehlender Historie und einen Ledger, der die Berechnung stuetzt.</p>
          <div class="warning">FIFO ist eine Berechnungsmethode, keine magische Loesung fuer fehlende Daten. Wenn Anschaffungshistorie unvollstaendig ist, sollte ein verantwortungsvolles Tool die Luecke anzeigen.</div>
          ${sources('de', 'estv')}
          <section class="cta-panel"><h2>FIFO-Berechnungen aus Ihren Exchange-Dateien ausfuehren</h2><p>CryptoDeclare wendet FIFO-Logik an, zeigt Warnungen zu fehlender Historie und exportiert eine strukturierte Beilage zur Pruefung.</p><a class="button" href="/#upload-area">Bericht erstellen</a></section>
        `,
        toc: [['example', 'Beispiel'], ['history', 'Historie'], ['swaps', 'Swaps'], ['report', 'Bericht']]
      }
    },

    'missing-crypto-transaction-history': {
      fr: {
        title: 'Historique crypto manquant | CryptoDeclare',
        description: 'Ce que signifient les couts d acquisition manquants et cessions FIFO non rapprochees pour le reporting fiscal crypto suisse.',
        eyebrow: 'Qualite des donnees',
        h1: 'Ce que l historique crypto manquant signifie pour <em>votre rapport fiscal</em>.',
        copy: 'Les cessions non rapprochees ne sont pas qu une erreur logicielle. Elles indiquent souvent des achats, transferts, wallets ou exchanges manquants.',
        article: `
          <p>Un probleme frequent consiste a vendre un actif sur une plateforme alors que l achat original a eu lieu ailleurs. Si le rapport ne voit pas l achat, il ne peut pas calculer de maniere fiable le cout d acquisition de la cession.</p>
          <h2 id="unmatched">Qu est-ce qu une cession non rapprochee ?</h2>
          <p>Une cession non rapprochee apparait lorsque le rapport voit une vente, un swap ou une sortie taxable, mais que l historique FIFO ne contient pas assez de quantite acquise pour la couvrir. Un rapport responsable doit le signaler au lieu d inventer un chiffre.</p>
          <h2 id="causes">Causes frequentes</h2>
          <ul><li>Vous avez importe une seule plateforme, mais achete l actif ailleurs.</li><li>Vous avez transfere depuis un wallet sans importer son historique.</li><li>Vous avez importe uniquement l annee fiscale, mais l actif a ete acquis une annee precedente.</li><li>L export omet des lignes anciennes, frais ou conversions.</li><li>Le ticker a change ou l historique d un token wrapped est incomplet.</li></ul>
          <h2 id="fix">Comment corriger</h2>
          <p>Exportez l historique complet de chaque plateforme pertinente. Si un actif vient d un wallet personnel, ajoutez l historique du wallet ou de la plateforme precedente lorsque possible. Si une reconstruction manuelle est necessaire, documentez source, date, quantite et valeur CHF.</p>
          <h2 id="report">Comment cela doit apparaitre</h2>
          <p>Le rapport doit montrer les actifs avec historique d acquisition manquant, les quantites non rapprochees et les produits exclus des calculs de gains realises. Cela montre ce qui doit etre revu avant soumission.</p>
          <div class="callout">CryptoDeclare signale l historique d acquisition manquant et les cessions FIFO non rapprochees pour indiquer si le rapport est complet ou necessite plus de donnees.</div>
          ${sources('fr', 'estv')}
          <section class="cta-panel"><h2>Verifier vos imports avant export</h2><p>Importez vos fichiers et CryptoDeclare signale l historique incomplet avant de vous appuyer sur l annexe finale.</p><a class="button" href="/#upload-area">Generer mon rapport</a></section>
        `,
        toc: [['unmatched', 'Cession non rapprochee'], ['causes', 'Causes'], ['fix', 'Corriger'], ['report', 'Avertissement']]
      },
      de: {
        title: 'Fehlende Krypto-Transaktionshistorie | CryptoDeclare',
        description: 'Was fehlende Anschaffungshistorie und nicht zugeordnete FIFO-Verkaeufe fuer Schweizer Krypto-Steuerreporting bedeuten.',
        eyebrow: 'Datenqualitaet',
        h1: 'Was fehlende Krypto-Historie fuer <em>Ihren Steuerbericht</em> bedeutet.',
        copy: 'Nicht zugeordnete Verkaeufe sind nicht nur ein Softwarefehler. Sie bedeuten meist, dass fruehere Kaeufe, Transfers, Wallets oder Boersen fehlen.',
        article: `
          <p>Ein haeufiges Krypto-Steuerproblem ist der Verkauf eines Assets auf einer Plattform, obwohl der urspruengliche Kauf anderswo stattfand. Wenn der Bericht den Kauf nicht sieht, kann er die Kostenbasis dieses Verkaufs nicht zuverlaessig berechnen.</p>
          <h2 id="unmatched">Was ist ein nicht zugeordneter Verkauf?</h2>
          <p>Ein nicht zugeordneter Verkauf entsteht, wenn der Bericht einen Verkauf, Swap oder steuerrelevanten Ausgang sieht, die FIFO-Lot-Historie aber nicht genug erworbene Menge enthaelt. Ein verantwortungsvoller Bericht sollte dies markieren, statt die Kostenbasis zu erfinden.</p>
          <h2 id="causes">Haeufige Ursachen</h2>
          <ul><li>Sie haben nur eine Boerse importiert, das Asset aber anderswo gekauft.</li><li>Sie haben Krypto aus einer Wallet transferiert, ohne die Wallet-Historie hochzuladen.</li><li>Sie haben nur das Steuerjahr importiert, das Asset aber frueher erworben.</li><li>Der Export laesst alte Zeilen, Gebuehren oder Konvertierungen aus.</li><li>Der Asset-Ticker hat sich geaendert oder Wrapped-Token-Historie ist unvollstaendig.</li></ul>
          <h2 id="fix">Wie man es behebt</h2>
          <p>Exportieren Sie die volle Historie jeder relevanten Plattform. Wenn ein Asset aus Self-Custody kam, fuegen Sie Wallet- oder Vorboersendaten hinzu, wo moeglich. Bei manueller Rekonstruktion sollten Quelle, Datum, Menge und CHF-Wert dokumentiert werden.</p>
          <h2 id="report">Wie es im Bericht erscheinen sollte</h2>
          <p>Der Bericht sollte zeigen, welche Assets fehlende Anschaffungshistorie haben, welche Menge nicht zugeordnet ist und welche Erloese aus realisierten Gewinnberechnungen ausgeschlossen wurden.</p>
          <div class="callout">CryptoDeclare markiert fehlende Anschaffungshistorie und nicht zugeordnete FIFO-Verkaeufe, damit sichtbar ist, ob der Bericht vollstaendig ist oder mehr Daten braucht.</div>
          ${sources('de', 'estv')}
          <section class="cta-panel"><h2>Importe vor dem Export pruefen</h2><p>Laden Sie Ihre Dateien hoch und CryptoDeclare hebt unvollstaendige Historie hervor, bevor Sie sich auf die finale Beilage stuetzen.</p><a class="button" href="/#upload-area">Bericht erstellen</a></section>
        `,
        toc: [['unmatched', 'Nicht zugeordnet'], ['causes', 'Ursachen'], ['fix', 'Beheben'], ['report', 'Warnung']]
      }
    },

    'exchange-csv-tax-report-switzerland': {
      fr: {
        title: 'Rapport fiscal depuis CSV d exchange | CryptoDeclare',
        description: 'Comment les exports CSV de Binance, Kraken, Coinbase, Swissquote, SwissBorg et autres peuvent devenir une annexe fiscale suisse.',
        eyebrow: 'Exports CSV',
        h1: 'De l export CSV a <em>l annexe fiscale suisse</em>.',
        copy: 'Pourquoi les exports bruts doivent etre parses, classes, convertis en CHF et verifies avant de devenir une documentation fiscale utile.',
        article: `
          <p>Les exports d exchange sont concus pour l historique de compte, pas pour le reporting fiscal suisse. Un ledger Binance, trade log Kraken, fichier Coinbase ou export Swissquote peuvent tous utiliser des colonnes, dates, frais et tickers differents.</p>
          <h2 id="formats">Chaque exchange parle differemment</h2>
          <p>Un export peut appeler BTC "XBT", un autre peut separer un trade en plusieurs lignes, un autre inclure des valeurs fiat tandis qu une autre plateforme exporte seulement des quantites. C est pourquoi les tableurs deviennent fragiles.</p>
          <h2 id="normalise">La normalisation est la premiere etape</h2>
          <p>Le processus doit normaliser tickers, dates, quantites, frais et types. Achats, ventes, depots, retraits, rewards, staking et frais doivent etre classes avant tout resume fiscal.</p>
          <h2 id="combine">Plusieurs fichiers doivent etre combines</h2>
          <p>Si vous avez utilise plusieurs exchanges, le calcul doit combiner tous les fichiers dans une seule chronologie. C est essentiel lorsque des actifs sont achetes sur une plateforme puis vendus sur une autre.</p>
          <h2 id="output">Ce que l annexe finale doit contenir</h2>
          <p>Une bonne annexe transforme les lignes CSV brutes en resume lisible: valeurs de fortune de fin d annee, revenus de staking, resultats FIFO, avertissements de completude, notes de source et ledger.</p>
          <div class="callout">CryptoDeclare prend en charge 23 formats d import, y compris les grandes plateformes et des CSV generiques pour les exports inhabituels.</div>
          ${sources('fr', 'ictax')}
          <section class="cta-panel"><h2>Importer vos exports d exchange</h2><p>Deposez des exports CSV ou Excel de plateformes compatibles et generez un rapport fiscal crypto suisse.</p><a class="button" href="/#upload-area">Generer mon rapport</a></section>
        `,
        toc: [['formats', 'Formats'], ['normalise', 'Normaliser'], ['combine', 'Combiner'], ['output', 'Resultat']]
      },
      de: {
        title: 'Exchange-CSV-Steuerbericht Schweiz | CryptoDeclare',
        description: 'Wie CSV-Exporte von Binance, Kraken, Coinbase, Swissquote, SwissBorg und anderen in eine Schweizer Krypto-Steuerbeilage umgewandelt werden koennen.',
        eyebrow: 'CSV-Exporte',
        h1: 'Von Exchange-CSV zur <em>Schweizer Steuerbeilage</em>.',
        copy: 'Warum rohe Exchange-Exporte geparst, klassifiziert, in CHF umgerechnet und auf Vollstaendigkeit geprueft werden muessen.',
        article: `
          <p>Exchange-Exporte sind fuer Kontoauszuege gedacht, nicht fuer Schweizer Steuerreporting. Ein Binance-Ledger, Kraken-Trade-Log, Coinbase-File oder Swissquote-Export kann unterschiedliche Spalten, Datumsformate, Gebuehrenlogik und Asset-Bezeichnungen verwenden.</p>
          <h2 id="formats">Jede Boerse spricht anders</h2>
          <p>Ein Export nennt BTC vielleicht "XBT", ein anderer teilt einen Trade in mehrere Zeilen auf, ein weiterer enthaelt Fiatwerte, waehrend eine andere Plattform nur Mengen exportiert. Deshalb wird direkte Tabellenarbeit schnell fragil.</p>
          <h2 id="normalise">Normalisierung ist der erste Schritt</h2>
          <p>Der Prozess sollte Ticker, Daten, Mengen, Gebuehren und Transaktionstypen normalisieren. Kaeufe, Verkaeufe, Einzahlungen, Auszahlungen, Rewards, Staking und Gebuehren sollten vor jeder Steuerzusammenfassung klassifiziert werden.</p>
          <h2 id="combine">Mehrere Dateien sollten kombiniert werden</h2>
          <p>Wenn Sie mehr als eine Boerse genutzt haben, sollte die Berechnung alle importierten Dateien in einer Timeline kombinieren. Das ist besonders wichtig, wenn Assets auf einer Plattform gekauft und auf einer anderen verkauft werden.</p>
          <h2 id="output">Was die finale Beilage enthalten sollte</h2>
          <p>Eine gute Beilage macht aus rohen CSV-Zeilen eine lesbare Zusammenfassung: Jahresendwerte, Staking-Ertraege, realisierte FIFO-Resultate, Vollstaendigkeitswarnungen, Quellnotizen und Transaktionsledger.</p>
          <div class="callout">CryptoDeclare unterstuetzt 23 Importformate, einschliesslich grosser Boersen und generischer CSV-Dateien fuer ungewoehnliche Exporte.</div>
          ${sources('de', 'ictax')}
          <section class="cta-panel"><h2>Exchange-Exporte hochladen</h2><p>Laden Sie CSV- oder Excel-Exporte unterstuetzter Plattformen hoch und erstellen Sie einen Schweizer Krypto-Steuerbericht.</p><a class="button" href="/#upload-area">Bericht erstellen</a></section>
        `,
        toc: [['formats', 'Formate'], ['normalise', 'Normalisieren'], ['combine', 'Dateien kombinieren'], ['output', 'Output']]
      }
    },

    'private-vs-professional-trader-switzerland': {
      fr: {
        title: 'Investisseur prive vs trader professionnel | CryptoDeclare',
        description: 'Guide suisse expliquant pourquoi le statut investisseur prive ou trader professionnel compte pour les gains crypto, revenus et reporting.',
        eyebrow: 'Statut fiscal',
        h1: 'Investisseur prive vs <em>trader professionnel</em>.',
        copy: 'La distinction peut influencer le traitement des gains crypto comme gains prives ou revenus imposables.',
        article: `
          <p>Beaucoup de detenteurs suisses entendent que les gains prives en crypto sont generalement exoneres. C est souvent un avantage cle pour les particuliers, mais ce n est pas toute l analyse. Les faits personnels comptent.</p>
          <h2 id="private">Investisseur prive</h2>
          <p>Un investisseur prive detient typiquement la crypto dans sa fortune privee. Dans ce cas, les avoirs de fin d annee sont declares comme fortune, et les gains prives sont generalement traites differemment du revenu. Staking, lending, salaire en crypto, mining ou activite commerciale restent a analyser separement.</p>
          <h2 id="professional">Trader professionnel</h2>
          <p>Si l activite ressemble davantage a du trading professionnel ou une activite commerciale, les gains peuvent etre traites differemment. Les indices peuvent inclure intensite de trading, fonds empruntes, courtes periodes de detention, derives ou dependance aux revenus de trading.</p>
          <h2 id="why">Pourquoi cela compte pour les rapports</h2>
          <p>Un rapport pour particulier peut calculer des gains realises a titre documentaire, mais le traitement fiscal peut differer pour un trader professionnel ou une entite juridique. Le rapport doit donc rester clair sur les categories.</p>
          <h2 id="advisor">Quand demander un conseiller</h2>
          <p>Si vous tradez souvent, utilisez levier ou derives, operez via une societe, avez de la DeFi complexe ou dependez du trading, demandez a un conseiller fiscal suisse de verifier votre statut et le rapport.</p>
          <div class="warning">CryptoDeclare aide a produire une documentation structuree. Il ne determine pas votre statut fiscal juridique et ne remplace pas un conseil professionnel.</div>
          ${sources('fr', 'circulars')}
          <section class="cta-panel"><h2>Preparer une annexe plus claire pour revue</h2><p>CryptoDeclare organise les donnees de transaction dans un rapport que vous pouvez relire ou partager avec un conseiller fiscal suisse.</p><a class="button" href="/#upload-area">Generer mon rapport</a></section>
        `,
        toc: [['private', 'Investisseur prive'], ['professional', 'Trader professionnel'], ['why', 'Pourquoi'], ['advisor', 'Conseiller']]
      },
      de: {
        title: 'Privatanleger vs professioneller Trader Schweiz | CryptoDeclare',
        description: 'Schweizer Krypto-Steuerguide, warum der Status als Privatanleger oder professioneller Trader fuer Gewinne, Einkommen und Reporting wichtig ist.',
        eyebrow: 'Steuerstatus',
        h1: 'Privatanleger vs <em>professioneller Trader</em>.',
        copy: 'Die Unterscheidung kann beeinflussen, ob Krypto-Gewinne als private Kapitalgewinne oder steuerbares Einkommen behandelt werden.',
        article: `
          <p>Viele Schweizer Krypto-Inhaber hoeren, dass private Krypto-Gewinne grundsaetzlich steuerfrei sind. Das ist oft ein wichtiger Vorteil fuer Privatpersonen, aber nicht das Ende der Analyse. Ihre persoenlichen Fakten sind entscheidend.</p>
          <h2 id="private">Privatanleger</h2>
          <p>Ein Privatanleger haelt Krypto typischerweise als Teil des Privatvermoegens. In diesem Fall werden Jahresendbestaende als Vermoegen deklariert, und private Kapitalgewinne werden grundsaetzlich anders behandelt als Einkommen. Staking, Lending, Lohn in Krypto, mining-aehnliche Einkuenfte oder Geschaeftstaetigkeit brauchen separate Analyse.</p>
          <h2 id="professional">Professioneller Trader</h2>
          <p>Wenn die Aktivitaet eher wie professionelles Trading oder Geschaeftstaetigkeit aussieht, koennen Gewinne anders behandelt werden. Hinweise koennen Handelsintensitaet, Fremdfinanzierung, kurze Haltefristen, Derivate oder Abhaengigkeit vom Trading-Einkommen sein.</p>
          <h2 id="why">Warum das fuer Berichte wichtig ist</h2>
          <p>Ein Bericht fuer Privatpersonen kann realisierte Gewinne dokumentieren, aber die steuerliche Behandlung kann sich von professionellem Trading oder juristischen Personen unterscheiden. Deshalb sollte der Bericht Kategorien klar darstellen.</p>
          <h2 id="advisor">Wann ein Berater sinnvoll ist</h2>
          <p>Wenn Sie haeufig handeln, Leverage oder Derivate nutzen, ueber eine Gesellschaft arbeiten, komplexe DeFi-Aktivitaet haben oder vom Trading-Einkommen abhaengen, sollte ein Schweizer Steuerberater Status und Bericht pruefen.</p>
          <div class="warning">CryptoDeclare hilft, strukturierte Belege zu erstellen. Es bestimmt nicht Ihren rechtlichen Steuerstatus und ersetzt keine professionelle Beratung.</div>
          ${sources('de', 'circulars')}
          <section class="cta-panel"><h2>Klarere Beilage fuer die Pruefung vorbereiten</h2><p>CryptoDeclare organisiert Transaktionsdaten in einem Bericht, den Sie selbst pruefen oder mit einem Schweizer Steuerberater teilen koennen.</p><a class="button" href="/#upload-area">Bericht erstellen</a></section>
        `,
        toc: [['private', 'Privatanleger'], ['professional', 'Professioneller Trader'], ['why', 'Warum wichtig'], ['advisor', 'Berater']]
      }
    },

    glossary: {
      fr: {
        title: 'Glossaire fiscal crypto suisse | CryptoDeclare',
        description: 'Glossaire fiscal crypto suisse expliquant FIFO, cout d acquisition, staking, fortune, derives crypto, CSV, cessions non rapprochees et autres termes.',
        eyebrow: 'Glossaire',
        h1: 'Glossaire fiscal crypto <em>suisse</em>.',
        copy: 'Definitions simples des termes crypto et fiscaux suisses que vous verrez en preparant un rapport CryptoDeclare.',
        article: glossaryArticle([
          ['Acquisition', 'Transaction qui augmente votre quantite d un actif: achat, reward, airdrop ou position d ouverture reconstruite manuellement. L historique d acquisition est necessaire pour le cout FIFO.'],
          ['Adresse', 'Destination publique sur une blockchain pour envoyer ou recevoir des cryptos. Les adresses aident a suivre les transferts, mais elles ne disent pas toujours si le wallet vous appartient.'],
          ['Airdrop', 'Crypto recue sans achat classique. Selon les faits, un airdrop peut devoir etre analyse comme revenu plutot que comme simple achat prive.'],
          ['Actif', 'Coin ou token crypto comme BTC, ETH, SOL ou USDC. Dans une annexe fiscale, chaque actif a normalement une quantite et une valeur CHF de fin d annee.'],
          ['Blockchain', 'Base de transactions partagee et maintenue par un reseau. Pour le reporting fiscal, elle peut montrer mouvements de wallet, swaps, frais et rewards absents d un CSV d exchange.'],
          ['Bridge', 'Transaction qui deplace de la valeur entre blockchains. Les bridges apparaissent souvent comme sorties et entrees de wallet et doivent etre revus pour eviter de les traiter comme ventes.'],
          ['Gain en capital', 'Resultat obtenu lorsqu un actif est cede pour plus que son cout d acquisition. Pour beaucoup de particuliers suisses, les gains prives sont traites differemment du revenu imposable.'],
          ['Exchange centralise', 'Plateforme comme Coinbase, Kraken, Binance, Bitstamp, Swissquote ou SwissBorg qui detient des comptes utilisateurs et exporte historiques de trades ou ledgers.'],
          ['Cout d acquisition', 'Valeur d acquisition d un actif, generalement en CHF. Elle est comparee au produit de cession pour calculer le gain ou la perte realisee.'],
          ['Derive crypto', 'Contrat financier dont la valeur depend d un cryptoactif, comme futures, options ou perpetuals. Les derives peuvent etre fiscalement complexes et meritent souvent une revue professionnelle.'],
          ['Exchange decentralise', 'Protocole permettant de swapper des cryptos directement depuis un wallet. L activite DEX peut etre plus difficile a reconstruire qu un compte exchange classique.'],
          ['Export CSV', 'Fichier de type tableur telecharge depuis une plateforme. CryptoDeclare lit les exports CSV et Excel pour creer une chronologie normalisee.'],
          ['DeFi', 'Finance decentralisee: pools de liquidite, lending, swaps, bridges ou yield farming. Les donnees DeFi sont souvent plus difficiles a classer que les trades d exchange.'],
          ['Cession', 'Transaction qui reduit votre position: vente, swap crypto-crypto, paiement ou sortie taxable. Les cessions ont besoin d historique de cout.'],
          ['ESTV / AFC', 'Administration federale des contributions. CryptoDeclare structure ses rapports autour des concepts fiscaux suisses et des references officielles lorsque pertinent.'],
          ['FIFO', 'Premier entre, premier sorti. Methode qui rapproche les cessions avec les premiers lots d acquisition disponibles.'],
          ['Monnaie fiat', 'Monnaie emise par un Etat, comme CHF, EUR ou USD. Le reporting suisse demande generalement des valeurs en CHF.'],
          ['Fork', 'Evenement ou une blockchain se separe et peut creer un nouvel actif pour les detenteurs. Les forks demandent souvent une revue manuelle.'],
          ['Contrat future', 'Derive qui suit le prix futur d un actif. Les futures sortent souvent d un reporting spot simple et peuvent necessiter une revue par un conseiller.'],
          ['Frais de gas', 'Frais de transaction blockchain, par exemple sur Ethereum. Les frais peuvent influencer le produit net, le cout d acquisition ou le ledger.'],
          ['ICTax', 'Base de reference suisse pour certaines valeurs fiscales. Les valeurs de fin d annee peuvent etre utiles pour la declaration de fortune.'],
          ['Ledger CSV', 'Export detaille des transactions de CryptoDeclare. Il aide le contribuable ou le conseiller a revoir le calcul.'],
          ['Revenu de lending', 'Rewards recus via lending ou produits earn. Ils doivent generalement etre separes des gains prives.'],
          ['Marge / leverage', 'Exposition empruntee pour augmenter une position. Le leverage peut indiquer une activite plus complexe qu un portefeuille prive simple.'],
          ['Transaction manuelle', 'Ligne ajoutee manuellement lorsque l export est incomplet, par exemple pour un solde d ouverture, achat manquant, reward ou mouvement de wallet.'],
          ['Revenu de mining', 'Crypto recue via mining ou activite similaire. Peut necessiter un traitement en revenu distinct d une vente privee.'],
          ['Historique d acquisition manquant', 'Avertissement indiquant que le rapport voit une cession mais pas assez d achats anterieurs pour calculer le cout FIFO complet.'],
          ['NFT', 'Token non fongible representant un actif ou droit numerique unique. L activite NFT peut inclure achats, ventes, frais de mint, royalties ou transferts de wallet.'],
          ['Option', 'Derive donnant le droit, mais pas l obligation, d acheter ou vendre un actif a un prix defini. Les options crypto doivent generalement etre revues attentivement.'],
          ['Contrat perpetual', 'Derive crypto similaire a un future mais sans date d expiration fixe. Les perpetuals peuvent creer gains, pertes, funding payments et exposition avec leverage.'],
          ['Investisseur prive', 'Contribuable qui detient la crypto comme fortune privee, et non comme activite professionnelle ou commerciale.'],
          ['Cle privee', 'Credential secret qui controle l acces a un wallet. Elle ne doit jamais etre importee ou partagee pour un rapport fiscal; utilisez plutot exports ou adresses publiques.'],
          ['Trader professionnel', 'Contribuable dont l activite peut etre consideree comme professionnelle, par exemple en raison de frequence, leverage, derives ou dependance au revenu de trading.'],
          ['Proof-of-stake', 'Mode de consensus ou des validateurs securisent le reseau en stakant des cryptos. Les rewards doivent normalement etre separes des gains en capital.'],
          ['Proof-of-work', 'Mode de consensus ou des mineurs utilisent de la puissance de calcul pour securiser le reseau. Les rewards de mining peuvent poser des questions de revenu.'],
          ['Cle publique', 'Identifiant cryptographique lie a un wallet. En pratique, le reporting fiscal utilise surtout exports de transactions et adresses plutot que secrets de wallet.'],
          ['Gain / perte realise', 'Resultat calcule lors d une cession. Il compare la valeur de cession au cout d acquisition.'],
          ['Staking', 'Deleguer ou verrouiller des cryptos pour soutenir un reseau proof-of-stake et recevoir des rewards. Les rewards doivent normalement etre separes des gains en capital.'],
          ['Stablecoin', 'Cryptoactif concu pour suivre une monnaie comme USD ou EUR. Les stablecoins demandent tout de meme historique, conversion CHF et soldes de fin d annee.'],
          ['Swap', 'Echange crypto-crypto, par exemple ETH contre SOL. Un swap peut etre a la fois une cession et une acquisition.'],
          ['Annexe fiscale', 'Document justificatif joint a une declaration fiscale. CryptoDeclare genere une annexe avec resumes, notes et ledger.'],
          ['Token', 'Actif crypto emis sur une blockchain, representant souvent utilite, gouvernance, valeur stablecoin ou droit lie a un protocole.'],
          ['Trading', 'Acheter, vendre ou swapper des cryptoactifs. Pour le reporting suisse, cela cree un historique necessaire aux resultats FIFO meme si les gains prives ne sont pas imposes comme revenu.'],
          ['Paire de trading', 'Les deux actifs d un marche, par exemple BTC/CHF ou ETH/USDT. La paire aide a identifier l actif cede et l actif acquis.'],
          ['Ledger de transactions', 'Liste detaillee des transactions importees et normalisees. Il rend le calcul verifiable.'],
          ['Transfert', 'Mouvement de crypto entre comptes ou wallets. Les transferts entre vos propres wallets ne sont normalement pas des ventes, mais ils aident a tracer l historique.'],
          ['Cession non rapprochee', 'Cession qui ne peut pas etre reliee completement a des lots d acquisition anterieurs. C est un avertissement de completude.'],
          ['Gain / perte non realise', 'Mouvement de prix sur une crypto que vous detenez encore. Il differe d un resultat realise car l actif n a pas ete cede.'],
          ['Validateur', 'Participant qui aide a securiser un reseau proof-of-stake. Deleguer a des validateurs peut generer des rewards de staking a identifier separement.'],
          ['Wallet', 'Outil ou adresse utilise pour detenir des cryptos, soit custodial via une plateforme, soit self-custody avec vos propres cles.'],
          ['Valeur de fortune', 'Valeur CHF des actifs detenus en fin d annee, typiquement au 31 decembre. Les avoirs crypto doivent normalement etre inclus comme fortune.'],
          ['Yield farming', 'Utilisation de protocoles DeFi pour gagner rewards, frais ou incentives. Cela peut creer beaucoup de petites transactions et demande une classification prudente.'],
          ['Valeur de portefeuille de fin d annee', 'Valeur totale en CHF de vos avoirs crypto a la fin de l annee fiscale. C est une sortie cle de l annexe crypto suisse.']
        ], 'Ce glossaire se concentre sur les termes pratiques du reporting fiscal crypto suisse, des exports CSV, du FIFO, du staking, des valeurs de fortune et des controles de completude.', 'Transformer ces termes en rapport', 'Importez vos CSV ou Excel et CryptoDeclare organise resultats FIFO, revenus de staking, valeurs de fortune et avertissements dans une annexe structuree.', 'Generer mon rapport')
      },
      de: {
        title: 'Schweizer Krypto-Steuerglossar | CryptoDeclare',
        description: 'Schweizer Krypto-Steuerglossar zu FIFO, Kostenbasis, Staking-Ertraegen, Vermoegenssteuer, Derivaten, CSV-Exporten und nicht zugeordneten Verkaeufen.',
        eyebrow: 'Glossar',
        h1: 'Schweizer Krypto-Steuer<em>glossar</em>.',
        copy: 'Einfache Definitionen der Krypto- und Schweizer Steuerbegriffe, die Sie beim Erstellen eines CryptoDeclare-Berichts sehen.',
        article: glossaryArticle([
          ['Anschaffung', 'Transaktion, die Ihren Bestand eines Assets erhoeht, zum Beispiel Kauf, Reward, Airdrop oder manuell rekonstruierte Anfangsposition. Anschaffungshistorie wird fuer FIFO benoetigt.'],
          ['Adresse', 'Oeffentliches Blockchain-Ziel zum Senden oder Empfangen von Krypto. Adressen helfen beim Nachverfolgen von Transfers, zeigen aber nicht immer, ob ein Wallet Ihnen gehoert.'],
          ['Airdrop', 'Krypto, die ohne normalen Kauf erhalten wird. Je nach Fakten kann ein Airdrop als Einkommen statt als einfacher privater Kauf zu pruefen sein.'],
          ['Asset', 'Krypto-Coin oder Token wie BTC, ETH, SOL oder USDC. In einer Steuerbeilage braucht jedes Asset normalerweise eine Jahresendmenge und einen CHF-Wert.'],
          ['Blockchain', 'Geteilte Transaktionsdatenbank, die von einem Netzwerk betrieben wird. Fuer Steuerberichte kann sie Wallet-Bewegungen, Swaps, Gebuehren und Rewards zeigen, die in einer Exchange-CSV fehlen.'],
          ['Bridge', 'Transaktion, die Wert zwischen Blockchains bewegt. Bridges erscheinen oft als ausgehende und eingehende Wallet-Bewegungen und sollten nicht vorschnell als Verkauf behandelt werden.'],
          ['Kapitalgewinn', 'Resultat aus dem Verkauf oder der Veraeusserung eines Assets ueber seiner Kostenbasis. Fuer viele Schweizer Privatpersonen werden private Kapitalgewinne anders behandelt als steuerbares Einkommen.'],
          ['Zentrale Boerse', 'Plattform wie Coinbase, Kraken, Binance, Bitstamp, Swissquote oder SwissBorg mit Nutzerkonten und Exporten fuer Trades oder Ledger.'],
          ['Kostenbasis', 'Anschaffungswert eines Assets, meist in CHF. Er wird mit dem Veraeusserungserloes verglichen, um realisierte Gewinne oder Verluste zu berechnen.'],
          ['Krypto-Derivat', 'Finanzvertrag, dessen Wert von einem Krypto-Asset abhaengt, zum Beispiel Futures, Optionen oder Perpetuals. Derivate koennen steuerlich komplex sein und sollten oft geprueft werden.'],
          ['Dezentrale Boerse', 'Protokoll, mit dem Nutzer Krypto direkt aus einem Wallet tauschen. DEX-Aktivitaet ist oft schwerer zu rekonstruieren als ein normaler Exchange-Account.'],
          ['CSV-Export', 'Tabellenartige Datei von einer Boerse oder Wallet-Plattform. CryptoDeclare liest CSV- und Excel-Exporte und erstellt daraus eine normalisierte Timeline.'],
          ['DeFi', 'Dezentrale Finanzaktivitaet wie Liquidity Pools, Lending, Swaps, Bridges oder Yield Farming. DeFi-Daten sind oft schwerer zu klassifizieren als Exchange-Trades.'],
          ['Veraeusserung', 'Transaktion, die Ihren Bestand reduziert, zum Beispiel Verkauf, Krypto-zu-Krypto-Swap, Zahlung oder steuerrelevanter Ausgang. Veraeusserungen brauchen Kostenhistorie.'],
          ['ESTV', 'Eidgenoessische Steuerverwaltung. CryptoDeclare strukturiert Berichte um Schweizer Steuerkonzepte und relevante offizielle Referenzen.'],
          ['FIFO', 'First in, first out. Methode, bei der Veraeusserungen zuerst mit den fruehesten verfuegbaren Anschaffungslots abgeglichen werden.'],
          ['Fiat-Waehrung', 'Staatliche Waehrung wie CHF, EUR oder USD. Schweizer Steuerreporting benoetigt normalerweise Werte in CHF.'],
          ['Fork', 'Ereignis, bei dem sich eine Blockchain aufspaltet und Halter ein neues Asset erhalten koennen. Forks benoetigen oft manuelle Pruefung.'],
          ['Futures-Kontrakt', 'Derivat, das den zukuenftigen Preis eines Assets abbildet. Futures liegen oft ausserhalb eines einfachen Spot-Trading-Workflows und sollten geprueft werden.'],
          ['Gas Fee', 'Blockchain-Transaktionsgebuehr, etwa auf Ethereum. Gebuehren koennen Nettoerloes, Kostenbasis oder Ledger beeinflussen.'],
          ['ICTax', 'Schweizer Referenzdatenbank fuer bestimmte Steuerwerte. Jahresendwerte koennen fuer die Vermoegensdeklaration relevant sein.'],
          ['Ledger-CSV', 'Detaillierter Transaktionsexport aus CryptoDeclare. Er hilft Steuerpflichtigen oder Beratern, die Berechnung zu pruefen.'],
          ['Lending-Ertrag', 'Rewards aus Lending- oder Earn-Produkten. Sie sollten grundsaetzlich von privaten Kapitalgewinnen getrennt werden.'],
          ['Margin / Leverage', 'Geliehene Exponierung zur Vergroesserung einer Position. Leverage kann ein Hinweis sein, dass die Aktivitaet komplexer ist als ein einfaches Privatportfolio.'],
          ['Manuelle Transaktion', 'Manuell erfasste Zeile, wenn ein Export unvollstaendig ist, zum Beispiel Anfangsbestand, fehlender Kauf, Reward oder Wallet-Bewegung.'],
          ['Mining-Einkommen', 'Krypto aus Mining oder aehnlicher Aktivitaet. Es kann eine Einkommensbehandlung brauchen und unterscheidet sich vom privaten Verkauf gehaltener Krypto.'],
          ['Fehlende Anschaffungshistorie', 'Warnung, dass der Bericht eine Veraeusserung sieht, aber nicht genug fruehere Kaeufe oder Anschaffungen fuer die volle FIFO-Kostenbasis.'],
          ['NFT', 'Nicht-fungibler Token fuer ein einzigartiges digitales Asset oder Recht. NFT-Aktivitaet kann Kaeufe, Verkaeufe, Minting-Kosten, Royalties oder Wallet-Transfers enthalten.'],
          ['Option', 'Derivat mit dem Recht, aber nicht der Pflicht, ein Asset zu einem bestimmten Preis zu kaufen oder zu verkaufen. Krypto-Optionen sollten sorgfaeltig geprueft werden.'],
          ['Perpetual-Kontrakt', 'Krypto-Derivat aehnlich einem Future, aber ohne festes Ablaufdatum. Perpetuals koennen komplexe Gewinne, Verluste, Funding Payments und Leverage erzeugen.'],
          ['Privatanleger', 'Steuerpflichtige Person, die Krypto als Privatvermoegen haelt und nicht als professionelle Handels- oder Geschaeftstaetigkeit.'],
          ['Privater Schluessel', 'Geheimes Zugangsmittel, das ein Wallet kontrolliert. Es sollte nie fuer einen Steuerbericht hochgeladen oder geteilt werden; Exporte oder oeffentliche Adressen sind sicherer.'],
          ['Professioneller Trader', 'Steuerpflichtige Person, deren Aktivitaet professionell wirken kann, etwa durch hohe Handelsintensitaet, Leverage, Derivate oder Abhaengigkeit vom Trading-Einkommen.'],
          ['Proof-of-stake', 'Konsensmodell, bei dem Validatoren das Netzwerk durch gestakte Krypto sichern. Rewards sollten normalerweise von Kapitalgewinnen getrennt werden.'],
          ['Proof-of-work', 'Konsensmodell, bei dem Miner Rechenleistung nutzen, um das Netzwerk zu sichern. Mining-Rewards koennen einkommensbezogene Fragen ausloesen.'],
          ['Oeffentlicher Schluessel', 'Kryptografischer Identifikator eines Wallets. Praktisch nutzt Steuerreporting meistens Transaktionsexporte und Adressen statt Wallet-Geheimnisse.'],
          ['Realisierter Gewinn / Verlust', 'Resultat bei einer Veraeusserung. Es vergleicht Veraeusserungswert und Kostenbasis.'],
          ['Staking', 'Delegieren oder Sperren von Krypto, um ein Proof-of-Stake-Netzwerk zu unterstuetzen und Rewards zu erhalten. Rewards sollten normalerweise von Kapitalgewinnen getrennt werden.'],
          ['Stablecoin', 'Krypto-Asset, das eine andere Waehrung wie USD oder EUR abbilden soll. Auch Stablecoins brauchen Historie, CHF-Umrechnung und Jahresendbestaende.'],
          ['Swap', 'Krypto-zu-Krypto-Tausch, zum Beispiel ETH gegen SOL. Ein Swap kann gleichzeitig Veraeusserung eines Assets und Anschaffung eines anderen sein.'],
          ['Steuerbeilage', 'Unterstuetzendes Dokument zur Steuererklaerung. CryptoDeclare erstellt eine Beilage mit Zusammenfassungen, Notizen und Ledger.'],
          ['Token', 'Krypto-Asset, das auf einer Blockchain ausgegeben wird und zum Beispiel Utility, Governance, Stablecoin-Wert oder ein protokollspezifisches Recht darstellen kann.'],
          ['Trading', 'Kaufen, Verkaufen oder Tauschen von Krypto-Assets. Fuer Schweizer Reporting entsteht dadurch Historie fuer FIFO-Resultate, auch wenn private Gewinne nicht als Einkommen besteuert werden.'],
          ['Trading-Paar', 'Die zwei Assets eines Marktes, zum Beispiel BTC/CHF oder ETH/USDT. Das Paar hilft zu erkennen, welches Asset veraeussert und welches angeschafft wurde.'],
          ['Transaktionsledger', 'Detaillierte Liste importierter und normalisierter Transaktionen. Er macht die Berechnung nachvollziehbar.'],
          ['Transfer', 'Bewegung von Krypto zwischen Konten oder Wallets. Transfers zwischen eigenen Wallets sind normalerweise keine Verkaeufe, helfen aber beim Nachverfolgen der Historie.'],
          ['Nicht zugeordnete Veraeusserung', 'Veraeusserung, die nicht vollstaendig mit frueheren Anschaffungslots abgeglichen werden kann. Das ist eine Vollstaendigkeitswarnung.'],
          ['Unrealisierter Gewinn / Verlust', 'Preisbewegung auf Krypto, die Sie noch halten. Anders als ein realisiertes Resultat, weil das Asset nicht veraeussert wurde.'],
          ['Validator', 'Teilnehmer, der ein Proof-of-Stake-Netzwerk sichert. Delegation an Validatoren kann Staking-Rewards erzeugen, die separat zu identifizieren sind.'],
          ['Wallet', 'Tool oder Adresse zum Halten von Krypto. Wallets koennen custodial ueber eine Plattform oder self-custody mit eigenen Schluesseln sein.'],
          ['Vermoegenssteuerwert', 'CHF-Wert der Assets am Jahresende, typischerweise per 31. Dezember. Krypto-Bestaende muessen normalerweise als Vermoegen enthalten sein.'],
          ['Yield Farming', 'Nutzung von DeFi-Protokollen, um Rewards, Gebuehren oder Incentives zu verdienen. Das kann viele kleine Transaktionen erzeugen und braucht vorsichtige Klassifikation.'],
          ['Jahresend-Portfoliowert', 'Gesamter CHF-Wert Ihrer Krypto-Bestaende am Ende des Steuerjahres. Ein wichtiger Output einer Schweizer Krypto-Steuerbeilage.']
        ], 'Dieses Glossar fokussiert auf praktische Begriffe aus Schweizer Krypto-Steuerreporting, CSV-Exporten, FIFO-Berechnungen, Staking-Ertraegen, Jahresendwerten und Vollstaendigkeitspruefungen.', 'Diese Begriffe in einen Bericht verwandeln', 'Laden Sie CSV- oder Excel-Exporte hoch und CryptoDeclare organisiert FIFO-Resultate, Staking-Ertraege, Jahresendwerte und Warnungen in einer strukturierten Beilage.', 'Bericht erstellen')
      }
    }
  };

  const original = {};

  function currentSlug() {
    const path = window.location.pathname.replace(/\/$/, '');
    const file = path.split('/').pop() || 'index';
    if (!file || file === 'guides') return 'index';
    return file.replace(/\.html$/, '');
  }

  function getStoredLang() {
    const query = new URLSearchParams(window.location.search).get('lang');
    if (SUPPORTED.includes(query)) return query;
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (SUPPORTED.includes(stored)) return stored;
    } catch (e) {}
    return 'en';
  }

  function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el && text != null) el.textContent = text;
  }

  function setHtml(selector, html) {
    const el = document.querySelector(selector);
    if (el && html != null) el.innerHTML = html;
  }

  function captureOriginal() {
    const metaDescription = document.querySelector('meta[name="description"]');
    original.title = document.title;
    original.description = metaDescription ? metaDescription.getAttribute('content') : '';
    original.htmlLang = document.documentElement.lang || 'en-CH';
    original.eyebrow = document.querySelector('.eyebrow')?.textContent || '';
    original.h1 = document.querySelector('h1')?.innerHTML || '';
    original.copy = document.querySelector('.hero-copy')?.textContent || '';
    original.article = document.querySelector('.article')?.innerHTML || '';
    original.toc = document.querySelector('.toc')?.innerHTML || '';
    original.cards = Array.from(document.querySelectorAll('.guide-card')).map(card => ({
      label: card.querySelector('.guide-card-label')?.textContent || '',
      title: card.querySelector('h2')?.textContent || '',
      body: card.querySelector('p')?.textContent || ''
    }));
    original.ctaTitle = document.querySelector('.cta-panel h2')?.textContent || '';
    original.ctaBody = document.querySelector('.cta-panel p')?.textContent || '';
    original.ctaButton = document.querySelector('.cta-panel .button')?.textContent || '';
    original.footerRight = document.querySelector('.guide-footer-inner span:last-child')?.innerHTML || '';
  }

  function buildSwitcher() {
    if (document.querySelector('.guide-lang-switcher')) return;
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    const wrap = document.createElement('div');
    wrap.className = 'guide-lang-switcher';
    wrap.setAttribute('aria-label', 'Language');
    SUPPORTED.forEach(lang => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'guide-lang-btn';
      btn.dataset.guideLang = lang;
      btn.textContent = lang.toUpperCase();
      btn.addEventListener('click', () => applyGuideLang(lang, true));
      wrap.appendChild(btn);
    });
    navLinks.appendChild(wrap);
  }

  function updateNav(lang) {
    const c = common[lang] || common.en;
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (link.classList.contains('nav-cta')) link.textContent = c.generate;
      else if (href === '/') link.textContent = c.home;
      else if (href.startsWith('/guides')) link.textContent = c.guides;
      else if (href.includes('#pricing')) link.textContent = c.pricing;
    });
  }

  function updateMeta(lang, page) {
    const metaDescription = document.querySelector('meta[name="description"]');
    document.documentElement.lang = lang === 'fr' ? 'fr-CH' : lang === 'de' ? 'de-CH' : original.htmlLang;
    document.title = page?.title || original.title;
    if (metaDescription) metaDescription.setAttribute('content', page?.description || original.description);
    setText('.hero-meta span:first-child', (common[lang] || common.en).updated);
    setText('.hero-meta span:last-child', (common[lang] || common.en).disclaimer);
  }

  function restoreOriginal() {
    updateMeta('en');
    setText('.eyebrow', original.eyebrow);
    setHtml('h1', original.h1);
    setText('.hero-copy', original.copy);
    const article = document.querySelector('.article');
    if (article) article.innerHTML = original.article;
    const toc = document.querySelector('.toc');
    if (toc) toc.innerHTML = original.toc;
    document.querySelectorAll('.guide-card').forEach((card, i) => {
      const src = original.cards[i];
      if (!src) return;
      setTextFor(card, '.guide-card-label', src.label);
      setTextFor(card, 'h2', src.title);
      setTextFor(card, 'p', src.body);
    });
    setText('.cta-panel h2', original.ctaTitle);
    setText('.cta-panel p', original.ctaBody);
    setText('.cta-panel .button', original.ctaButton);
    setHtml('.guide-footer-inner span:last-child', original.footerRight);
  }

  function setTextFor(parent, selector, text) {
    const el = parent.querySelector(selector);
    if (el) el.textContent = text;
  }

  function renderToc(items, lang) {
    if (!items) return;
    const toc = document.querySelector('.toc');
    if (!toc) return;
    toc.innerHTML = `<div class="toc-title">${(common[lang] || common.en).onPage}</div>` +
      items.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('');
  }

  function applyIndex(page, lang) {
    document.querySelectorAll('.guide-card').forEach((card, i) => {
      const item = page.cards?.[i];
      if (!item) return;
      setTextFor(card, '.guide-card-label', item[0]);
      setTextFor(card, 'h2', item[1]);
      setTextFor(card, 'p', item[2]);
    });
    setText('.cta-panel h2', page.ctaTitle);
    setText('.cta-panel p', page.ctaBody);
    setText('.cta-panel .button', page.ctaButton);
    setText('.guide-footer-inner span:last-child', (common[lang] || common.en).footerNote);
  }

  function applyArticle(page, lang) {
    const article = document.querySelector('.article');
    if (article && page.article) article.innerHTML = page.article;
    renderToc(page.toc, lang);
    setHtml('.guide-footer-inner span:last-child', `<a href="/guides/">${(common[lang] || common.en).back}</a>`);
  }

  function updateButtons(lang) {
    document.querySelectorAll('.guide-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.guideLang === lang);
    });
  }

  function updateUrl(lang) {
    const url = new URL(window.location.href);
    if (lang === 'en') url.searchParams.delete('lang');
    else url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
  }

  function applyGuideLang(lang, writeUrl) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    const slug = currentSlug();
    const page = pages[slug]?.[lang];

    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    updateNav(lang);

    if (lang === 'en' || !page) {
      restoreOriginal();
    } else {
      updateMeta(lang, page);
      setText('.eyebrow', page.eyebrow);
      setHtml('h1', page.h1);
      setText('.hero-copy', page.copy);
      if (slug === 'index') applyIndex(page, lang);
      else applyArticle(page, lang);
    }

    updateButtons(lang);
    if (writeUrl) updateUrl(lang);
  }

  document.addEventListener('DOMContentLoaded', () => {
    captureOriginal();
    buildSwitcher();
    applyGuideLang(getStoredLang(), false);
  });
})();
