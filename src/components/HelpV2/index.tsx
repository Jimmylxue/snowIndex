import { commandGroups } from '@/core/hint';

export function HelpNodeV2() {
  return (
    <div className='terminal-help font-mono text-sm text-gray-200 bg-gray-900 p-4 rounded-lg shadow-lg bg-opacity-50 mt-2'>
      <div className='help-header mb-4 border-b border-gray-700 pb-2'>
        <div className='text-green-400 flex items-center'>
          <span className='text-yellow-300 mr-2'>❯</span>
          <span>
            Available commands (type `help &lt;command&gt;` for details)
          </span>
        </div>
      </div>

      <div className='command-groups space-y-6'>
        {commandGroups.map((group, groupIndex) => (
          <div key={groupIndex} className='command-group'>
            <div className='group-title text-blue-300 font-bold mb-2 pl-2 border-l-4 border-blue-500'>
              {group.name} [{group.type}]
            </div>

            <div className='commands-grid grid grid-cols-1 md:grid-cols-2 gap-2'>
              {group.commands.map((cmd, cmdIndex) => (
                <div
                  key={cmdIndex}
                  className='command-item bg-gray-800 p-3 rounded hover:bg-gray-750 transition-colors'>
                  <div className='command-header flex items-baseline mb-1'>
                    <span className='command-name text-yellow-300 font-bold mr-3'>
                      {cmd.start}
                    </span>
                    {cmd.shortStart && (
                      <span className='command-aliases text-gray-400 text-xs'>
                        (aliases: {cmd.shortStart.join(', ')})
                      </span>
                    )}
                  </div>
                  <div className='command-desc text-gray-300 mb-1'>
                    {cmd.desc}
                  </div>
                  <div className='command-hint text-gray-400 text-xs font-mono bg-gray-900 p-1 rounded'>
                    {cmd.hint.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='help-footer mt-4 pt-2 border-t border-gray-700 text-gray-400 text-xs'>
        敬请期待
      </div>
    </div>
  );
}
