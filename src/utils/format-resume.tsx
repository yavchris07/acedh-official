// export const formatResume = (text: string) => {
//   return text.split("\n").map((line, index) => {
//     // ## => titre
//     if (line.startsWith("#")) {
//       return (
//         <h2
//           key={index}
//           className="text-xl font-bold text-gray-900 mt-6 mb-3"
//         >
//           {line.replace("#", "")}
//         </h2>
//       );
//     }

//     // **texte** => gras
//     return (
//       <p key={index} className="text-gray-500 text-xl max-sm:text-sm mb-2">
//         {line.split(/(\*\*.*?\*\*)/g).map((part, i) =>
//           part.startsWith("**") && part.endsWith("**") ? (
//             <strong key={i}>
//               {part.slice(2, -2)}
//             </strong>
//           ) : (
//             part
//           )
//         )}
//       </p>
//     );
//   });
// };

export const formatResume = (text: string) => {
  if (!text) return null;

  return text.split("\n").map((line, index) => {
    if (line.startsWith("#")) {
      return (
        <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-black">
          {line.replace("#", " ")}
        </h2>
      );
    }

    // if (line.startsWith("#")) {
    //   return (
    //     <p key={index} className="text-xl font-bold mt-6 mb-3 text-black">
    //       {line.replace("#", " ")}
    //     </p>
    //   );
    // }

    return (
      <p key={index} className="mb-2">
        {line
          .split(/(\*\*.*?\*\*)/g)
          .map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={i}>{part.slice(2, -2)}</strong>
            ) : (
              part
            ),
          )}
      </p>
    );
  });
};
