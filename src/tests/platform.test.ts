import strSim from "string-similarity";

const IT = process.env.NODE_ENV === 'production' ? it.skip : it;

describe('#similarity', () => {
  IT('should show match index', () => {
    const fullName = 'федеррер - андреев';
    const pairNames = [
      'джокович - надаль', 'федеррер - андреев',
      'роджер федеррер - сергей андреев',
      'р. федеррер - с. андреев',
      'р. федеррер - сергей андреев',
      'сафин - паредес', 'федерация - англия',
      'федератор - андерсон',
    ];
    pairNames.forEach(pairName => {
      const match = strSim.findBestMatch(fullName, [pairName]);
      console.log(`${fullName} to ${pairName}: ${match.bestMatch.rating}`);
    });
  })
  it('should show match index', () => {
    const fullName = 'Умбер У';
    const pairNames = ['Е.Александрова - Э.Свитолина'];
    pairNames.forEach(pairName => {
      const match = strSim.findBestMatch(fullName, [pairName]);
      console.log(`${fullName} to ${pairName}: ${match.bestMatch.rating}`);
    });
  })
})
